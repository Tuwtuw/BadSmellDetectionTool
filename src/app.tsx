import { createRoot } from 'react-dom/client';
import { routes } from './routes';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter(routes);

const container = document.getElementById('root');
const root = createRoot(container);

function render() {
  root.render(<RouterProvider router={router} />);
}

render();
