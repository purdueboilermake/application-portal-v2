import './App.css'

import '@mantine/core/styles.css';

import { BackgroundImage, MantineProvider } from '@mantine/core';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './Root';
import { bmApplyTheme } from './theme';
import { LoginPage } from './login/LoginPage';
import background from './assets/cave-background.png';
import { ApplicationPage } from './application/ApplicationPage';
import { loadApplicationOrLoginLoader } from './application/application-loader';
import { rootLoader } from './root-loader';
import { ConfirmationPage } from './confirmation/ConfirmationPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        loader: rootLoader,
      },
      {
        path: 'application/:appId',
        element: <ApplicationPage />,
        loader: loadApplicationOrLoginLoader,
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'confirmation',
        element: <ConfirmationPage />
      }
    ]
  }
]);

function App() {
  return (
    <MantineProvider theme={bmApplyTheme}>
      <RouterProvider router={appRouter} />
    </MantineProvider>
  )
}

export default App
