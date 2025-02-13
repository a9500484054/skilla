import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Provider
import './style/style.scss';
import App from './App.tsx';
import store from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Оборачиваем приложение в Provider */}
      <App />
    </Provider>
  </StrictMode>
);