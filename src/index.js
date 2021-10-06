import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

import App from './components/App';
import PlantContextProvider from './contexts/PlantContextProvider';
import AdminContextProvider from './contexts/AdminContextProvider';
import CartContextProvider from './contexts/CartContextProvider';

// const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <PlantContextProvider>
      <CartContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </CartContextProvider>
    </PlantContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);