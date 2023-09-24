import * as ReactDOM from 'react-dom';
import { routes } from './routes';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { firstTimeDatabaseInitialization } from './logic/database/database';

const router = createHashRouter(routes);

useEffect(() => {
  firstTimeDatabaseInitialization();
}, []);

function render() {
  ReactDOM.render(<RouterProvider router={router} />, document.body);
}

render();
