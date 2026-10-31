
let foods = [
    ["🍕 Pizza", 199],
    ["🍔 Burger", 149],
    ["🍟 Fries", 99],
    ["🥤 Juice", 79]
];

let cart = [];
let total = 0;

foods.forEach((f, i) => {
    menu.innerHTML += `
    <div class="item">
    <h3>${f[0]}</h3>
    ₹${f[1]}<br><br>
    <button onclick="add(${i})">Add</button>
    </div>`;
});

function add(i) {
    cart.push(foods[i]);
    total += foods[i][1];
    document.getElementById("cart").innerHTML =
        cart.map(f => f[0] + " - ₹" + f[1]).join("<br>");
    document.getElementById("total").innerText = total;
}
