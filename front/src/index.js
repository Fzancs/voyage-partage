import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

console.log('App is being rendered'); // Debug
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);