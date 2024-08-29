import React, { Component } from 'react';
import './App.css'; // Importa o CSS para estilizar a aplicação

// Dados dos produtos com imagens de frutas
const productList = [
  {
    id: 1,
    name: 'Maçã',
    quantity: 1,
    image: 'https://th.bing.com/th/id/OIP.2gAf-IX0LtKDxuxD9kj_LgHaHa?rs=1&pid=ImgDetMain'
  },
  {
    id: 2,
    name: 'Banana',
    quantity: 1,
    image: 'https://th.bing.com/th/id/OIP.BpXPGh-9OSshTExiUXY7MQHaKd?w=146&h=206&c=7&r=0&o=5&pid=1.7'
  },
  {
    id: 3,
    name: 'Laranja',
    quantity: 1,
    image: 'https://th.bing.com/th/id/OIP.1JVEMwKutu3PZ9srS_x6NAHaG9?w=217&h=205&c=7&r=0&o=5&pid=1.7'
  }
];

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cart: [],
    };
  }

  // Adiciona um produto ao carrinho
  addToCart = (product) => {
    this.setState((prevState) => {
      const existingItem = prevState.cart.find(item => item.id === product.id);
      if (existingItem) {
        // Se o item já estiver no carrinho, aumenta a quantidade
        return {
          cart: prevState.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        // Adiciona um novo item ao carrinho
        return {
          cart: [...prevState.cart, { ...product, quantity: 1 }]
        };
      }
    });
  };

  // Remove um item do carrinho
  removeFromCart = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter(item => item.id !== id)
    }));
  };

  // Ajusta a quantidade de um item no carrinho
  adjustQuantity = (id, amount) => {
    this.setState((prevState) => {
      return {
        cart: prevState.cart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        ).filter(item => item.quantity > 0)
      };
    });
  };

  render() {
    const { cart } = this.state;

    return (
      <div className="container">
        <h1>Lista de Compras</h1>
        <div className="product-list">
          {productList.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <button onClick={() => this.addToCart(product)}>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
        <h2>Carrinho</h2>
        <div className="cart">
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name} - {item.quantity}</span>
                <div className="quantity-controls">
                  <button onClick={() => this.adjustQuantity(item.id, 1)}>+</button>
                  <button onClick={() => this.adjustQuantity(item.id, -1)}>-</button>
                  <button onClick={() => this.removeFromCart(item.id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ShoppingList;
