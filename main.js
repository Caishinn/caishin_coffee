const cart = [];

function addToCart(itemName, itemPrice, qtyId, itemId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  if (qty > 0) {
    cart.push({ name: itemName, price: itemPrice, qty: qty });
    document.getElementById(itemId).querySelector("button").innerText = "Added";
    document.getElementById(itemId).querySelector("button").disabled = true;
    updateCartDisplay();
  }
}
// cart animation

function addToCart(itemName, itemPrice, qtyId, itemId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  if (qty > 0) {
    cart.push({ name: itemName, price: itemPrice, qty: qty });
    const button = document.getElementById(itemId).querySelector("button");
    button.innerText = "Added";
    button.disabled = true;

    // Add "added" class for animation
    const itemDiv = document.getElementById(itemId);
    itemDiv.classList.add("added");

    setTimeout(() => {
      itemDiv.classList.remove("added");
    }, 500);

    updateCartDisplay();
  }
}

function removeItemFromCart(index, itemName) {
  cart.splice(index, 1);
  updateCartDisplay();
  resetMenuItemButton(itemName);
}

function updateItemQuantity(index, newQty) {
  if (newQty > 0) {
    cart[index].qty = newQty;
    updateCartDisplay();
  }
}
function updateItemQuantity(index, newQty) {
  if (newQty > 0 && newQty <= 10) {
    // Limit the quantity to 10
    cart[index].qty = newQty;
    updateCartDisplay();
  }
}

// Cart

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty. Please have your order.</p>";
    return;
  }
  let html = "<ul>";
  cart.forEach((item, index) => {
    html += `
      <div class="cart-item">
        <div class="item-info">
          <span>${item.qty} × ${item.name}</span>
          <span class="price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
        <button class="remove-btn" onclick="removeItemFromCart(${index}, '${
      item.name
    }')">Remove</button>
      </div>`;
  });

  html += "</ul>";
  cartItems.innerHTML = html;
}
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty. Please have your order.</p>";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    html += `
        <div class="cart-item">
          <div class="item-info">
            <span>${item.qty} × ${item.name}</span>
            <span class="price">$${(item.price * item.qty).toFixed(2)}</span>
          </div>
          <button class="remove-btn" onclick="removeItemFromCart(${index}, '${
      item.name
    }')">Remove</button>
        </div>`;
  });

  html += `
      <div class="cart-total">
        <span>Total:</span>
        <span class="total-price">$${total.toFixed(2)}</span>
      </div>
    `;

  cartItems.innerHTML = html;
}

// Check out

function checkout() {
  document.querySelector(".menu-section").style.display = "none";
  document.querySelector(".cart-section").style.display = "none";
  document.getElementById("checkout-section").style.display = "block";

  const summary = document.getElementById("order-summary");
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // Clear previous QR if any

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart was empty.</p>";
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  const orderId =
    "MEOW-" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

  let html = `<p><strong>Order ID:</strong> ${orderId}</p>`;
  html += `<p><strong>Date:</strong> ${dateStr} &nbsp;&nbsp; <strong>Time:</strong> ${timeStr}</p>`;
  html += "<ul>";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `<li>${item.qty} × ${item.name} — $${itemTotal.toFixed(2)}</li>`;
  });

  html += `</ul><p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
  summary.innerHTML = html;

  // Generate QR Code

  new QRCode(qrContainer, {
    text: "https://pay.ababank.com/v8yVU9vQ6rmoAN3u7",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

// Back to menu button

function goBackToMenu() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
          <p>Your cart is empty. Please have your order.</p>
          <button onclick="goBackToMenu()">Browse Menu</button>
        `;
    return;
  }

  document.querySelector(".menu-section").style.display = "block";
  document.querySelector(".cart-section").style.display = "block";
  document.getElementById("checkout-section").style.display = "none";
  cart.length = 0;
  updateCartDisplay();
  resetButtons();
}

// Reset Button

function resetButtons() {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    const button = item.querySelector("button");
    button.innerText = "Add to Cart";
    button.disabled = false;
  });
}

function resetMenuItemButton(itemName) {
  const item = document.getElementById(`item-${itemName.toLowerCase()}`);
  const button = item.querySelector("button");
  button.innerText = "Add to Cart";
  button.disabled = false;
}

// Download recide

function downloadReceipt() {
  if (cart.length === 0) {
    alert("No items in cart to generate receipt.");
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  const orderId =
    "MEOW-" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

  let receipt = `Time to Meow Coffee\n`;
  receipt += `------------------------\n`;
  receipt += `Order ID : ${orderId}\nDate     : ${dateStr}\nTime     : ${timeStr}\n`;
  receipt += `------------------------\n`;
  receipt += `Qty  Item           Total\n`;
  receipt += `------------------------\n`;

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    const line = `${item.qty.toString().padEnd(4)} ${item.name.padEnd(
      14
    )} $${itemTotal.toFixed(2)}`;
    receipt += line + `\n`;
  });

  receipt += `------------------------\n`;
  receipt += `TOTAL:               $${total.toFixed(2)}\n`;
  receipt += `------------------------\n`;
  receipt += `To Get the Cafe, Please Sent the Receipt to my Telegram or Facebook. Thank you for your order!\n`;

  const blob = new Blob([receipt], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${orderId}-receipt.txt`;
  link.click();
}

// Download PDF recide

async function downloadPDFReceipt() {
  if (cart.length === 0) {
    alert("No items in cart to generate receipt.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  const orderId =
    "MEOW-" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

  let y = 20;

  // Header
  doc.setFontSize(16);
  doc.text("Time to Meow Coffee", 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.text("www.meowcoffee.com", 20, y);
  y += 5;
  doc.text("Phone: (855) 98 239 034", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Order ID: ${orderId}`, 20, y);
  y += 6;
  doc.text(`Date: ${dateStr}   Time: ${timeStr}`, 20, y);
  y += 10;

  doc.text("Order Summary:", 20, y);
  y += 6;
  doc.setFont("Courier", "normal");
  doc.setFontSize(10);

  let total = 0;
  cart.forEach((item) => {
    const line = `${item.qty} x ${item.name.padEnd(12)} $${(
      item.qty * item.price
    ).toFixed(2)}`;
    doc.text(line, 25, y);
    total += item.qty * item.price;
    y += 6;
  });

  doc.setFont("Helvetica", "bold");
  y += 2;
  doc.text(`Total: $${total.toFixed(2)}`, 25, y);
  y += 12;

  // QR Code generation using QRious
  const qr = new QRious({
    value: "https://pay.ababank.com/v8yVU9vQ6rmoAN3u7",
    size: 100,
  });

  // Convert QR to Image and embed in PDF
  const qrDataUrl = qr.toDataURL();
  doc.addImage(qrDataUrl, "PNG", 70, y, 50, 50);
  y += 60;

  doc.setFont("Helvetica", "normal");
  doc.text(
    "Scan the QR code to Pay.'Also Screen Shot or Save And Sent The Receipt to my telegram (098 239 034)'.",
    20,
    y
  );

  // Save PDF
  doc.save(`${orderId}-receipt.pdf`);
}
