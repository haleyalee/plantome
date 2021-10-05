import React from 'react';
import ReactDOM from 'react-dom';
// import {QueryClient, QueryClientProvider} from 'react-query';
import './styles/index.css';
import App from './components/App';
import PlantContextProvider from './contexts/PlantContextProvider';
import AdminContextProvider from './contexts/AdminContextProvider';

// const client = new QueryClient();

ReactDOM.render(
  // <QueryClientProvider client={client}>
  <React.StrictMode>
    <PlantContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </PlantContextProvider>
  </React.StrictMode>,
  // </QueryClientProvider>,
  document.getElementById('root')
);