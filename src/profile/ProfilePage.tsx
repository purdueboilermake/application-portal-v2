import { Button, Flex, Group, Image, Stack, Text } from "@mantine/core";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User, getAuth, signOut } from "firebase/auth";

import './ProfilePage.css';
import { GenericPage } from "../GenericPage";
import { ApplicationsSection } from "./ApplicationSection";
import { useCallback, useMemo, useState, useEffect } from "react";
import { DocumentReference, getDoc } from "firebase/firestore";
import { BoilermakeApplication, defaultBoilermakeApplication } from "../service/application";

export function ProfilePage() {

  const { currentUser, currentApplication } = useLoaderData() as { currentUser: User, currentApplication: DocumentReference };
  const [applicationData, setApplicationData] = useState<BoilermakeApplication>(defaultBoilermakeApplication);
  const navigator = useNavigate();
  const auth = useMemo(() => getAuth(), []);

  useEffect(() => {
    const fetchApplicationData = async () => {
      const docSnap = await getDoc(currentApplication);
      if (docSnap.exists()) {
        setApplicationData(docSnap.data() as BoilermakeApplication);
      } else {
        setApplicationData(defaultBoilermakeApplication);
      }
    };

    fetchApplicationData();
  }, [currentApplication]);

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
            { applicationData.appStatus != 'UNSUBMITTED' ? <h3>{ applicationData.firstName } { applicationData.lastName }</h3> : <h3>Name Not Found</h3> }
            { applicationData.appStatus != 'UNSUBMITTED' ? <h4>{ applicationData.email }</h4> : <h4>Email Not Found</h4> }
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
