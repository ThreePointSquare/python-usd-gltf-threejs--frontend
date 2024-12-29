import { createApp } from 'vue';
import App from './App.vue';
import ResizeObserver from 'resize-observer-polyfill';
import './assets/styles.css';

window.ResizeObserver = ResizeObserver;

const observerErrorHandler = (err) => {
  if (err.message === 'ResizeObserver loop limit exceeded') {
    // Ignore the error
    return;
  }
  console.error(err);
};

window.addEventListener('error', observerErrorHandler);

createApp(App).mount('#app');