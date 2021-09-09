import React from 'react';
import ReactDOM from 'react-dom';
// import {QueryClient, QueryClientProvider} from 'react-query';
import './styles/index.css';
import App from './components/App';

// const client = new QueryClient();

ReactDOM.render(
  // <QueryClientProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // </QueryClientProvider>,
  document.getElementById('root')
);