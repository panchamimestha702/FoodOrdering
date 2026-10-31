
let cart = {};

function addFood(name, price) {
  if (cart[name]) {
    cart[name].qty++;
  } else {
    cart[name] = { price: price, qty: 1 };
  }
  displayCart();
}

function changeQty(name, amount) {
  cart[name].qty += amount;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }

  displayCart();
}

function displayCart() {
  let total = 0;
  let output = "";

  for (let name in cart) {
    let item = cart[name];
    total += item.price * item.qty;

    output += `${name} - ₹${item.price} 
    x ${item.qty}
    <button onclick="changeQty('${name}',1)">+</button>
    <button onclick="changeQty('${name}',-1)">-</button><br>`;
  }

  document.getElementById("cart").innerHTML =
    output || "Cart is empty";

  document.getElementById("total").innerText =
    "Total: ₹" + total;
}

function orderFood() {
  if (Object.keys(cart).length === 0) {
    alert("Please add food first!");
    return;
  }

  document.getElementById("status").innerText =
    "Order Confirmed! Preparing Your Food 🍕";
}
