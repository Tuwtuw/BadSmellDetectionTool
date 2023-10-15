import { App } from './components/app';
import {
  BadSmells,
  DetectionStrategies,
  Metrics,
  MainMenu,
  ErrorPage,
  IssueDetection,
  MetricsCreateAndEditPage,
  DetectionStrategiesCreateAndEditPage,
  BadSmellsCreateAndEditPage,
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
        path: '/metrics/new',
        element: <MetricsCreateAndEditPage mode="create" />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/metrics/edit',
        element: <MetricsCreateAndEditPage mode="edit" />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/strategies',
        element: <DetectionStrategies />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/strategies/new',
        element: <DetectionStrategiesCreateAndEditPage mode="create" />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/strategies/edit',
        element: <DetectionStrategiesCreateAndEditPage mode="edit" />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/badsmells',
        element: <BadSmells />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/badsmells/new',
        element: <BadSmellsCreateAndEditPage mode="create" />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/badsmells/edit',
        element: <BadSmellsCreateAndEditPage mode="edit" />,
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
