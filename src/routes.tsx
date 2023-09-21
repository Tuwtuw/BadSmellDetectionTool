import { App } from './components/app';
import {
  BadSmells,
  DetectionStrategies,
  Metrics,
  MainMenu,
  ErrorPage,
  IssueDetection,
  BadSmellsCreatePage,
} from './pages';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainMenu />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/metrics',
        element: <Metrics />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/strategies',
        element: <DetectionStrategies />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/badsmells',
        element: <BadSmells />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/badsmells/new',
        element: <BadSmellsCreatePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/badsmells/edit',
        element: <BadSmellsCreatePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/detect',
        element: <IssueDetection />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
