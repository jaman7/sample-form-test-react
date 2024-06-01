import App from 'App';
import { createRoot } from 'react-dom/client';
import './assets/scss/main.scss';
import { LoadingProvider } from 'core/loading/LoadingContext';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
