let cart = [];
let total = 0;

document.getElementById("loginBtn").addEventListener("click", () => {
    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("menuScreen").classList.remove("hidden");
});

document.getElementById("viewCartBtn").addEventListener("click", () => {
    showCart();
});

function addToCart(product, price) {
    const quantity = parseInt(document.getElementById(product.toLowerCase() + "Quantity").value);
    cart.push({ product, price, quantity });
    total += price * quantity;
    alert(`${product} adicionado ao carrinho`);
}

function showCart() {
    let cartHTML = '';
    cart.forEach(item => {
        cartHTML += `<p>${item.quantity}x ${item.product} - R$ ${item.price * item.quantity}</p>`;
    });
    document.getElementById("cartItems").innerHTML = cartHTML;
    document.getElementById("totalPrice").textContent = total;
    document.getElementById("cartScreen").classList.remove("hidden");
    document.getElementById("menuScreen").classList.add("hidden");
}

function confirmPurchase() {
    const paymentMethod = document.getElementById("paymentMethod").value;
    const address = document.getElementById("address").value;
    if (address === "") {
        alert("Por favor, forneça um endereço.");
        return;
    }
    alert(`Compra confirmada! Pagamento via ${paymentMethod}. Endereço: ${address}`);
    cart = [];
    total = 0;
    document.getElementById("cartScreen").classList.add("hidden");
    document.getElementById("homeScreen").classList.remove("hidden");
}
