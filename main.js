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

function removeItemFromCart(index, itemName) {
  cart.splice(index, 1);
  updateCartDisplay();
  resetMenuItemButton(itemName);
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  let html = "<ul>";
  cart.forEach((item, index) => {
    html += `
        <li>${item.qty} × ${item.name} <span>$${(item.price * item.qty).toFixed(
      2
    )}</span>
        <button onclick="removeItemFromCart(${index}, '${
      item.name
    }')">Remove</button>
        </li>`;
  });
  html += "</ul>";
  cartItems.innerHTML = html;
}

function checkout() {
  document.querySelector(".menu-section").style.display = "none";
  document.querySelector(".cart-section").style.display = "none";
  document.getElementById("checkout-section").style.display = "block";
}

function goBackToMenu() {
  document.querySelector(".menu-section").style.display = "block";
  document.querySelector(".cart-section").style.display = "block";
  document.getElementById("checkout-section").style.display = "none";
  cart.length = 0;
  updateCartDisplay();
  resetButtons();
}

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
