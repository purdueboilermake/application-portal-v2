import { Outlet, useNavigate } from "react-router-dom";
import { AppShell, Avatar, Center, Flex, Image } from '@mantine/core';

import main_logo from './assets/main_logo.png';
import mlh_logo from './assets/mlh-logo-color.png';

import './Root.css';
import { useCallback, useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./auth-context";
import "./firebase-config";

const responsiveToolbarHeight = { base: 54, sm: 60, lg: 76 };
const responsiveImageHeight = { base: 50, sm: 56, lg: 72 };

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

  const onProfileClick = useCallback(async () => {
    await navigator('/profile');
  }, [navigator]);

  const onTeamsClick = useCallback(async () => {
    await navigator('/teams');
  }, [navigator]);

  return (
    <AppShell
      header={{ height: responsiveToolbarHeight }}
      withBorder={false}
      padding={{ xs: 'sm', sm: 'sm', md: 'md', lg: 'xl', xl: 'xl' }}
    >
      <AppShell.Header>
        <Flex>
          <div className="logo-container">
            <Image src={main_logo} h={responsiveImageHeight} w="auto" fit="contain" />
            <Image src={mlh_logo} h={responsiveImageHeight} w="auto" fit="contain" p='8px' />
            <h4 style={{margin: 0}}>BoilerMake Apply</h4>
          </div>
          <span style={{flex: 1}}></span>
          <div className="toolbar-button-container" style={{ display: 'flex', alignItems: 'center' }}>
            <button className="toolbar-button" onClick={onTeamsClick}>Teams</button>
          </div>
          <div className="login-info-container">
            { user &&
              <Avatar
                className="profile-avatar-button"
                src={user.photoURL ?? 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg'}
                onClick={onProfileClick} />
            }
          </div>
        </Flex>
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