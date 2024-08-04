import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import service worker registration


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);
serviceWorkerRegistration.register(); // Register the service worker