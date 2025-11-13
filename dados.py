from flask import Flask, jsonify, request # type: ignore

app = Flask(__name__)

# Carrinho armazenado na memória (poderia ser um banco de dados em um sistema real)
cart = []

# Lista de produtos (em uma loja real, isso viria do banco de dados)
products = [
    {"id": 1, "name": "Café Expresso", "price": 8.0},
    {"id": 2, "name": "Café Duplo", "price": 12.0},
    {"id": 3, "name": "Brownie", "price": 10.0},
    {"id": 4, "name": "Capuccino", "price": 14.0},
    {"id": 5, "name": "Pão", "price": 5.0},
    {"id": 6, "name": "Cookies", "price": 6.0}
]

# Rota para exibir todos os produtos
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

# Rota para visualizar o carrinho
@app.route('/api/cart', methods=['GET'])
def view_cart():
    return jsonify(cart)

# Rota para adicionar um produto ao carrinho
@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    # Pegando o ID e a quantidade do produto a ser adicionado
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    # Encontrando o produto baseado no ID
    product = next((item for item in products if item['id'] == product_id), None)

    if product:
        cart.append({"product": product, "quantity": quantity, "total_price": product["price"] * quantity})
        return jsonify({"message": f"{product['name']} adicionado ao carrinho.", "cart": cart}), 201
    else:
        return jsonify({"error": "Produto não encontrado"}), 404

# Rota para remover um produto do carrinho
@app.route('/api/cart/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    global cart
    cart = [item for item in cart if item['product']['id'] != product_id]
    return jsonify({"message": "Produto removido do carrinho", "cart": cart})

# Rota para finalizar a compra (confirmar pedido)
@app.route('/api/checkout', methods=['POST'])
def checkout():
    if not cart:
        return jsonify({"error": "Carrinho vazio. Não é possível finalizar a compra."}), 400

    total_price = sum(item['total_price'] for item in cart)
    cart.clear()  # Limpa o carrinho após a compra
    return jsonify({"message": "Compra finalizada com sucesso!", "total_price": total_price})

if __name__ == '__main__':
    app.run(debug=True)
