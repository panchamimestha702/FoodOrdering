
let total = 0;

function addFood(price) {
  total += price;
  document.getElementById("total").innerText =
    "Total: ₹" + total;
}

function orderFood() {
  if (total === 0) {
    alert("Add food first!");
    return;
  }

  document.getElementById("status").innerText =
    "Order Confirmed! Preparing...";
}
