import React from 'react';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';
import './styles/index.scss';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
