import { Outlet } from "react-router-dom";
import { AppShell, Container, Flex, Image, Space } from '@mantine/core';

import main_logo from './assets/main_logo.png';

import './Root.css';
import { useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./auth-context";
import "./firebase-config";

const responsiveToolbarHeight = { xs: 48, sm: 60, md: 60, lg: 76, xl: 76 };

export function Root() {

  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);

  // watch the current user
  onAuthStateChanged(auth,
    newUser => {
      setUser(newUser);
    },
    err => {
      throw err;
    }
  );

  /*
  return (
    <AppShell
      // header={{ height: { base: 48, sm: 60, lg: 76 } }}
      withBorder={false}
    >
      <AppShell.Header>
        <div className="logo-container">
          <Image src={main_logo} h={{ base: 48, sm: 60, lg: 76 }} w="auto" fit="contain" />
          <h2>BoilerMake Apply</h2>
          <Space />
          { user &&
            <p>{ user.displayName }</p>
          }
          { !user &&
            <p>Not logged in</p>
          }
        </div>
      </AppShell.Header>
      <AppShell.Main>
        <AuthContext.Provider value={user}>
          <Outlet />
        </AuthContext.Provider>
      </AppShell.Main>
    </AppShell>
  );*/

  return (
    <Container>
      <header>
        <Flex h={responsiveToolbarHeight} p={16} align='center' gap={32}>
          <Image src={main_logo} h={responsiveToolbarHeight} w="auto" fit="contain" />
          <h2 style={{margin: '0'}}>BoilerMake Apply</h2>
          <span style={{flex: 1}} />
          { user &&
            <p>{ user.displayName }</p>
          }
          { !user &&
            <p>Not logged in</p>
          }
        </Flex>
      </header>
      <main>
        <AuthContext.Provider value={user}>
          <Outlet />
        </AuthContext.Provider>
      </main>
    </Container>
  )
}