import "./App.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./Root";
import { bmApplyTheme } from "./theme";
import { LoginPage } from "./login/LoginPage";
import { ApplicationPage } from "./application/ApplicationPage";
import { loadApplicationOrLoginLoader } from "./application/application-loader";
import { rootLoader } from "./root-loader";
import { ConfirmationPage } from "./confirmation/ConfirmationPage";
import { ProfilePage } from "./profile/ProfilePage";
import { profilePageLoader } from "./profile/profile-loader";
import TeamsPage from "./teams/TeamsPage";
import { teamsLoader } from "./teams/teams-loader";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        loader: rootLoader,
      },
      {
        path: "application/:appId",
        element: <ApplicationPage />,
        loader: loadApplicationOrLoginLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: profilePageLoader,
      },
      {
        path: "teams",
        element: <TeamsPage />,
        loader: teamsLoader,
      },
    ],
  },
]);

function App() {
  return (
    <MantineProvider theme={bmApplyTheme}>
      <Notifications />
      <RouterProvider router={appRouter} />
    </MantineProvider>
  );
}

export default App;
