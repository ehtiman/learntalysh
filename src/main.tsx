import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// --- ADD THIS SECTION ---
// This check handles the redirect from our 404.html hack
const query = new URLSearchParams(window.location.search);
const redirectPath = query.get('p');

if (redirectPath) {
  // Clear the query parameter and tell React Router to go to the correct path
  window.history.replaceState(null, '', import.meta.env.BASE_URL + redirectPath.slice(1));
}
// ------------------------

createRoot(document.getElementById("root")!).render(<App />);
