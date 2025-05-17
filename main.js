// Global variables
const cart = [];
let orderId = "";

// ----- CART FUNCTIONS -----

// Add item to cart
function addToCart(name, price, qtyId, itemId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  if (qty > 0) {
    const image = document.querySelector(`#${itemId} img`).src;
    cart.push({ name, price, qty, image_url: image });

    const button = document.getElementById(itemId).querySelector("button");
    button.innerText = "Added";
    button.disabled = true;

    const itemDiv = document.getElementById(itemId);
    itemDiv.classList.add("added");
    setTimeout(() => itemDiv.classList.remove("added"), 500);

    updateCartUI();
  }
}

// Remove item from cart by index and name
function removeItemFromCart(index, name) {
  const i = cart.findIndex((item, idx) => idx === index && item.name === name);
  if (i !== -1) cart.splice(i, 1);
  updateCartUI();
  resetMenuItemButton(name);
}

// Update quantity for cart item
function updateItemQuantity(index, qty) {
  if (qty > 0 && qty <= 10) {
    cart[index].qty = qty;
    updateCartUI();
  }
}

// Update all cart related UI and counts
function updateCartUI() {
  updateCartDisplay();
  updateCartCount();
  updateMobileCart();
}

// Display cart items
function updateCartDisplay() {
  const container = document.getElementById("cart-items");
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty. Please have your order.</p>";
    return;
  }

  let total = 0;
  const html = cart.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <div class="cart-item">
        <div class="item-info">
          <span>${item.qty} × ${item.name}</span>
          <span class="price">$${itemTotal.toFixed(2)}</span>
        </div>
        <button class="remove-btn" onclick="removeItemFromCart(${idx}, '${item.name}')">Remove</button>
      </div>`;
  }).join("");

  container.innerHTML = html + `
    <div class="cart-total">
      <span>Total:</span>
      <span class="total-price">$${total.toFixed(2)}</span>
    </div>`;
}

// Update cart count badge
function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  if (totalQty > 0) {
    countEl.textContent = totalQty;
    countEl.classList.remove('hidden');
  } else {
    countEl.textContent = '';
    countEl.classList.add('hidden');
  }
}

// Update mobile cart UI
function updateMobileCart() {
  const container = document.getElementById("mobile-cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty. Please add something!</p>";
    return;
  }

  let total = 0;
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div class="item-info">
        <span>${item.qty} × ${item.name}</span>
        <span class="price">$${itemTotal.toFixed(2)}</span>
      </div>
      <button class="remove-btn" onclick="removeItemFromCart(${idx}, '${item.name}')">Remove</button>
    `;
    container.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  container.appendChild(totalDiv);
}

// Reset specific menu item button to default
function resetMenuItemButton(name) {
  const item = document.getElementById(`item-${name.toLowerCase()}`);
  if (!item) return;
  const button = item.querySelector("button");
  button.innerText = "Add to Cart";
  button.disabled = false;
}

// ----- CHECKOUT & ORDER HANDLING -----

// Start checkout: show summary and QR code
function checkout() {
  document.querySelector(".menu-section").style.display = "none";
  document.querySelector(".cart-section").style.display = "none";
  document.getElementById("checkout-section").style.display = "block";

  const summary = document.getElementById("order-summary");
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart was empty.</p>";
    return;
  }

  const now = new Date();
  orderId = "MEOW-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

  let html = `
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Date:</strong> ${now.toLocaleDateString()} &nbsp;&nbsp; <strong>Time:</strong> ${now.toLocaleTimeString()}</p>
    <ul>
  `;

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `<li>${item.qty} × ${item.name} — $${itemTotal.toFixed(2)}</li>`;
  });

  html += `</ul><p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
  summary.innerHTML = html;

  const qrImg = document.createElement('img');
  qrImg.src = './qrcode.jpg'; // Replace with actual QR code path
  qrImg.alt = 'QR Code';
  qrImg.style.width = '128px';
  qrImg.style.height = '128px';
  qrContainer.appendChild(qrImg);
}

// Confirm payment and save order
function confirmPayment() {
  if (cart.length === 0) {
    alert("No items in cart to confirm payment.");
    return;
  }

  const now = new Date();
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });

  const order = {
    id: orderId,
    date: now.toISOString(),
    items: [...cart],
    total: total
  };

  saveOrderToHistory(order);
  sendReceiptEmail();

  alert('Payment confirmed! Thank you for your order.');

  // Clear cart and UI after payment
  cart.length = 0;
  updateCartDisplay();
  updateCartCount();
  resetButtons(); // <--- Add this line to reset buttons state

  // Show menu and cart again, hide checkout
  document.querySelector(".menu-section").style.display = "block";
  document.querySelector(".cart-section").style.display = "block";
  document.getElementById("checkout-section").style.display = "none";
}

// Save order history in localStorage
function saveOrderToHistory(order) {
  const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  history.push(order);
  localStorage.setItem('orderHistory', JSON.stringify(history));
}

// Go back to menu (reload page)
function goBackToMenu() {
  location.reload();
}

// ----- RECEIPT DOWNLOAD -----

function downloadReceipt() {
  if (cart.length === 0) {
    alert("No items in cart to generate receipt.");
    return;
  }

  const now = new Date();
  let receipt = `Time to Meow Coffee\n------------------------\n`;
  receipt += `Order ID : ${orderId}\nDate     : ${now.toLocaleDateString()}\nTime     : ${now.toLocaleTimeString()}\n------------------------\n`;
  receipt += `Qty  Item           Total\n------------------------\n`;

  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    receipt += `${item.qty.toString().padEnd(4)} ${item.name.padEnd(14)} $${itemTotal.toFixed(2)}\n`;
  });

  receipt += `------------------------\nTOTAL:               $${total.toFixed(2)}\n------------------------\n`;
  receipt += `To Get the Cafe, Please Send the Receipt to Telegram or Facebook.\n`;

  const blob = new Blob([receipt], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${orderId}-receipt.txt`;
  link.click();
}

async function downloadPDFReceipt() {
  if (cart.length === 0) {
    alert("No items in cart to generate receipt.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;
  const now = new Date();

  doc.setFontSize(16);
  doc.text("Time to Meow Coffee", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Order ID: ${orderId}`, 20, y);
  y += 6;
  doc.text(`Date: ${now.toLocaleDateString()}   Time: ${now.toLocaleTimeString()}`, 20, y);
  y += 10;

  let total = 0;
  cart.forEach(item => {
    const line = `${item.qty} x ${item.name.padEnd(12)} $${(item.qty * item.price).toFixed(2)}`;
    doc.text(line, 20, y);
    y += 6;
    total += item.qty * item.price;
  });

  doc.setFont("Helvetica", "bold");
  doc.text(`Total: $${total.toFixed(2)}`, 20, y + 6);

  const qrImageUrl = 'qrcode.jpg'; // Replace with actual QR code image URL
  doc.addImage(qrImageUrl, "PNG", 70, y + 12, 50, 50);

  doc.save(`${orderId}-receipt.pdf`);
}

// ----- EMAIL -----

function sendReceiptEmail() {
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  let orders_html = "";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = (item.price * item.qty).toFixed(2);
    total += parseFloat(itemTotal);
    orders_html += `
      <tr>
        <td><img src="${item.image_url}" alt="${item.name}" style="height: 64px;" /></td>
        <td>
          <div>${item.name}</div>
          <div style="color: #888;">QTY: ${item.qty}</div>
        </td>
        <td style="text-align: right;"><strong>$${itemTotal}</strong></td>
      </tr>`;
  });

  const templateParams = {
    order_id: orderId,
    email: "caishin0423@gmail.com",
    orders_html,
    cost_shipping: "0.00",
    cost_tax: "0.00",
    cost_total: total.toFixed(2)
  };

  emailjs.send("Caishin_0423", "receipt", templateParams)
    .then(() => alert("Receipt sent successfully!"))
    .catch(() => alert("Failed to send receipt."));
}

// ----- ORDER HISTORY -----

function loadOrderHistory() {
  const container = document.getElementById('order-history-list');
  container.innerHTML = "";

  const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]').reverse();

  if (orders.length === 0) {
    container.innerHTML = '<p style="color: #555; text-align:center;">No past orders found.</p>';
    updateClearButtonState();
    return;
  }

  orders.forEach(order => {
    const itemsHTML = order.items.map(item =>
      `<div class="item-line"><span>${item.qty} × ${item.name}</span><span>$${(item.price * item.qty).toFixed(2)}</span></div>`
    ).join("");

    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order-card');
    orderDiv.innerHTML = `
      <div class="order-header">
        <strong>🧾 Order ID: ${order.id}</strong>
        <span class="order-date">${new Date(order.date).toLocaleString()}</span>
      </div>
      <div class="order-items">${itemsHTML}</div>
      <div class="order-total">Total: $${order.total.toFixed(2)}</div>
    `;

    container.appendChild(orderDiv);
  });

  updateClearButtonState();
}

function updateClearButtonState() {
  const button = document.getElementById('clear-history-btn');
  const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  if (!button) return;

  if (orders.length === 0) {
    button.disabled = true;
    button.style.opacity = '0.5';
    button.style.cursor = 'not-allowed';
  } else {
    button.disabled = false;
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
  }
}

function clearOrderHistory() {
  if (confirm('Are you sure you want to clear all order history?')) {
    localStorage.removeItem('orderHistory');
    loadOrderHistory();
    updateClearButtonState();
    alert('Order history cleared.');
  }
}

// ----- MODAL & MOBILE MENU TOGGLING -----

// Open order history modal
function openOrderHistory() {
  document.getElementById('order-history-modal').style.display = 'block';
  document.getElementById('modal-overlay').style.display = 'block';
  loadOrderHistory();
}

// Close order history modal
function closeOrderHistory() {
  document.getElementById('order-history-modal').style.display = 'none';
  document.getElementById('modal-overlay').style.display = 'none';
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.querySelector('.menu-section');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
}

// ----- INITIALIZATION -----

window.addEventListener('load', () => {
  updateCartUI();
  loadOrderHistory();

  // Bind buttons
  document.getElementById('order-history-btn')?.addEventListener('click', openOrderHistory);
  document.getElementById('close-history-btn')?.addEventListener('click', closeOrderHistory);
  document.getElementById('modal-overlay')?.addEventListener('click', closeOrderHistory);
  document.getElementById('clear-history-btn')?.addEventListener('click', clearOrderHistory);
});
