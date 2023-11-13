import { Outlet, useNavigate } from "react-router-dom";
import { AppShell, Button, Center, Image, Space } from '@mantine/core';

import main_logo from './assets/main_logo.png';

import './Root.css';
import { useCallback, useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AuthContext } from "./auth-context";
import "./firebase-config";

const responsiveToolbarHeight = { base: 48, sm: 60, lg: 76 };

export function Root() {

  const auth = getAuth();

  const [user, setUser] = useState<User | null>(null);
  const navigator = useNavigate();

  // watch the current user
  useEffect(() => {
    onAuthStateChanged(auth,
      newUser => {
        setUser(newUser);
      },
      err => {
        throw err;
      }
    );
  }, [auth]);

  const onLogout = useCallback(async () => {
    await signOut(auth);
    navigator('/login');
  }, []);

  return (
    <AppShell
      header={{ height: responsiveToolbarHeight }}
      withBorder={false}
      padding={{ xs: 'sm', sm: 'sm', md: 'md', lg: 'xl', xl: 'xl' }}
    >
      <AppShell.Header>
        <div className="logo-container">
          <Image src={main_logo} h={responsiveToolbarHeight} w="auto" fit="contain" />
          <h4 style={{margin: 0}}>BoilerMake Apply</h4>
          <Space />
          { user &&
            <>
            <p>{ user.displayName }</p>
            <Button variant="subtle" c='red' onClick={onLogout}>Log Out</Button>
            </>
          }
          { !user &&
            <p>Not logged in</p>
          }
        </div>
      </AppShell.Header>
      <AppShell.Main style={{maxHeight: '100dvh', overflowY: 'auto'}}>
        <Center>
          <AuthContext.Provider value={user}>
            <Outlet />
          </AuthContext.Provider>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
}