let cart = [];
let total = 0;

document.getElementById("menuCarrinho").addEventListener("click", () => {
    showCart();
});

function addToCart(product, price) {
    const quantity = parseInt(document.getElementById(product.replace(/ /g, "").toLowerCase() + "Quantity").value);
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
    alert(`Compra confirmada! Total: R$ ${total}`);
    cart = [];
    total = 0;
    document.getElementById("cartScreen").classList.add("hidden");
    document.getElementById("menuScreen").classList.remove("hidden");
}
