import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { CartProvider } from "react-use-cart";
import { BrowserRouter } from 'react-router-dom';

import { store } from 'src/store';
import { App } from 'src/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'swiper/css';
import 'react-tabs/style/react-tabs.css';
import 'rodal/lib/rodal.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);