import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/animations.css';
import { initIntersectionObserver, parallaxScroll } from './utils/animation';
import { Provider } from 'react-redux';
import { store } from './ReduxStore/store';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
      <Provider store={store} >
        <App />
      </Provider>
  </StrictMode>
);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  initIntersectionObserver();
  parallaxScroll();
});