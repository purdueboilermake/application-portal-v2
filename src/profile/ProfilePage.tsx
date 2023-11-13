import { Button, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User, getAuth, signOut } from "firebase/auth";

import './ProfilePage.css';
import { GenericPage } from "../GenericPage";
import { ApplicationsSection } from "./ApplicationSection";
import { useCallback, useMemo } from "react";

export function ProfilePage() {

  const currentUser = useLoaderData() as User;
  const navigator = useNavigate();
  const auth = useMemo(() => getAuth(), []);

  const onLogout = useCallback(async () => {
    await signOut(auth);
    navigator('/login');
  }, [auth, navigator]);

  return (
    <GenericPage>
      <Flex direction={'column'} gap={16}>
        <Group color="white" className="profile-subsection-container">
          <Image
            src={currentUser?.photoURL ?? 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg'}
            radius='xl'
            h={200}
            w='auto'
            fit="fill"
            />
          <Stack className="user-info-container">
            <h3>{ currentUser?.displayName ?? currentUser?.uid }</h3>
            <h4>{ currentUser?.email }</h4>
            <Button color="red" onClick={onLogout}>Log Out</Button>
          </Stack>
        </Group>
        <Stack className="profile-subsection-container">
          <Text fw='bold' component={'h3'}>Your Applications</Text>
          <ApplicationsSection user={currentUser} />
        </Stack>
      </Flex>
    </GenericPage>
  );
}
