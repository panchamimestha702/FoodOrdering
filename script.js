
const foods = [
    {name: "Pizza", price: 199, category: "Pizza", image: "🍕"},
    {name: "Cheese Burger", price: 149, category: "Burger", image: "🍔"},
    {name: "French Fries", price: 99, category: "Burger", image: "🍟"},
    {name: "Cold Coffee", price: 79, category: "Drinks", image: "🥤"},
    {name: "Veg Pizza", price: 179, category: "Pizza", image: "🍕"},
    {name: "Fresh Juice", price: 89, category: "Drinks", image: "🧃"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "All";

function displayFood() {
    const list = document.getElementById("foodList");
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(search) &&
        (currentCategory === "All" || food.category === currentCategory)
    );

    list.innerHTML = filtered.length ? filtered.map((food) => `
        <div class="food-card">
            <div class="food-img">${food.image}</div>
            <h3>${food.name}</h3>
            <p>₹${food.price}</p>
            <button onclick="addToCart('${food.name}')">
                Add to Cart
            </button>
        </div>
    `).join("") : "<p>No food found!</p>";
}

function filterFood(category) {
    currentCategory = category;
    displayFood();
}

function addToCart(name) {
    const item = cart.find(food => food.name === name);

    if (item) {
        item.quantity++;
    } else {
        const food = foods.find(food => food.name === name);
        cart.push({...food, quantity: 1});
    }

    updateCart();
}

function updateCart() {
    const items = document.getElementById("cartItems");
    let total = 0;
    let count = 0;

    items.innerHTML = cart.map((food, index) => {
        total += food.price * food.quantity;
        count += food.quantity;

        return `
            <div class="cart-item">
                <span>${food.image} ${food.name}</span>
                <span>₹${food.price * food.quantity}</span>
                <button onclick="changeQty(${index}, -1)">-</button>
                ${food.quantity}
                <button onclick="changeQty(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    }).join("");

    document.getElementById("total").textContent = total;
    document.getElementById("count").textContent = count;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Please add food to your cart!");
        return;
    }

    alert("Order placed successfully! Thank you.");
    cart = [];
    updateCart();
}

document.getElementById("search").addEventListener("input", displayFood);

displayFood();
updateCart();
