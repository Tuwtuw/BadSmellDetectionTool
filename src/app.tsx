import * as ReactDOM from 'react-dom';
import { routes } from './routes';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter(routes);

function render() {
  ReactDOM.render(<RouterProvider router={router} />, document.body);
}

render();
