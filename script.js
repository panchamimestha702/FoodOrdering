
let cart = {};
let trackingTimer;

function addFood(name, price) {
    if (cart[name]) {
        cart[name].qty++;
    } else {
        cart[name] = {
            price: price,
            qty: 1
        };
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

        output += `
        <div class="cart-item">
            ${name} - ₹${item.price} x ${item.qty}
            <br>
            <button onclick="changeQty('${name}',1)">+</button>
            <button onclick="changeQty('${name}',-1)">-</button>
            <button onclick="removeFood('${name}')">Remove</button>
        </div>`;
    }

    document.getElementById("cart").innerHTML =
        output || "Cart is empty";

    document.getElementById("total").innerText =
        "Total: ₹" + total;
}

function removeFood(name) {
    delete cart[name];
    displayCart();
}

function orderFood() {
    if (Object.keys(cart).length === 0) {
        alert("Please add food first!");
        return;
    }

    clearInterval(trackingTimer);

    document.getElementById("tracking").style.display = "block";
    document.getElementById("orderBtn").disabled = true;

    let steps = ["step1", "step2", "step3", "step4"];

    steps.forEach(id => {
        document.getElementById(id).classList.remove("active");
    });

    let messages = [
        "Your order is confirmed!",
        "Your food is being prepared!",
        "Your food is out for delivery!",
        "Your order has been delivered! 🎉"
    ];

    let i = 0;

    function updateTracking() {
        document.getElementById(steps[i]).classList.add("active");

        document.getElementById("status").innerText =
            messages[i];

        i++;

        if (i < steps.length) {
            trackingTimer = setTimeout(updateTracking, 3000);
        } else {
            cart = {};
            displayCart();
            document.getElementById("orderBtn").disabled = false;
        }
    }

    updateTracking();

    document.getElementById("tracking").scrollIntoView({
        behavior: "smooth"
    });
}

displayCart();
