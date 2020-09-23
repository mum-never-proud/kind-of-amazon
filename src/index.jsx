import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from 'contexts/User';
import ShopProvider from 'contexts/Shop';
import App from './app';

ReactDOM.render((
  <UserProvider>
    <ShopProvider>
      <App />
    </ShopProvider>
  </UserProvider>
), document.getElementById('app'));
