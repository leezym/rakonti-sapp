import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux-store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Add global input logging for debugging
document.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    console.log('React: Input focused:', e.target.name || e.target.id || e.target);
  }
});

document.addEventListener('focusout', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    console.log('React: Input blurred:', e.target.name || e.target.id || e.target);
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
       </PersistGate>
    </Provider>
  </React.StrictMode>
);
