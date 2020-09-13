import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from 'contexts/User';
import CartProvider from 'contexts/Cart';
import App from './app';

ReactDOM.render((
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>
), document.getElementById('app'));
