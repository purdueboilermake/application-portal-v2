import { Badge, Button, Flex, Loader, Text } from "@mantine/core";
import { User } from "firebase/auth"
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ServiceContainer } from "../service/service-container";
import { getDoc } from "firebase/firestore";
import { BoilermakeApplicationStatus } from "../service/application";
import { useNavigate } from "react-router-dom";

interface ApplicationsSectionProps {
  user: User;
}

const badgeColor = (status: BoilermakeApplicationStatus | null | undefined): string => {
  switch (status) {
    case "UNSUBMITTED":
      return 'yellow';
    case "SUBMITTED":
      return 'blue';
    case "DENIED":
      return 'red';
    case "WAITLISTED":
      return 'purple';
    case "ACCEPTED":
      return 'green';
    default:
      return 'blue';
  }
}

export const ApplicationsSection: FC<ApplicationsSectionProps> = ({ user }: ApplicationsSectionProps) => {

  const applicationSerivce = useMemo(() => ServiceContainer.instance().applicationService, []);

  const [loading, setLoading] = useState(true);
  const [noApps, setNoApps] = useState(false);
  const [appStatus, setAppStatus] = useState<BoilermakeApplicationStatus | null>();
  const [appId, setAppId] = useState<string | null>(null);
  const navigator = useNavigate();

  const openApplication = useCallback(async () => {
    await navigator(`/application/${appId}`);
  }, [navigator, appId]);

  useEffect(() => {

    const loadAppStatus = async () => {
      const appRef = await applicationSerivce.findUserForm(user);
      if (!appRef) {
        setLoading(false);
        setNoApps(true);
        return;
      }

      const appDoc = await getDoc(appRef);
      const currentAppStatus = appDoc.get('appStatus') as BoilermakeApplicationStatus;
      setLoading(false);
      setNoApps(false);
      setAppStatus(currentAppStatus);
      setAppId(appRef.id);
    }

    loadAppStatus();

  }, [user, applicationSerivce]);

  return (
    <>
    {!loading && !noApps && appId &&
    <Flex align={'center'} gap={8}>
      <Text>BoilerMake XII</Text>
      <span style={{flex: 1}}></span>
      <Badge color={badgeColor(appStatus)} size="lg">{ appStatus }</Badge>
      <Button onClick={openApplication}>VIEW</Button>
    </Flex>
    }
    { loading &&
      <Loader></Loader>
    }
    { noApps &&
      <p>It appears you do not have any active applications.</p>
    }
    </>
  )
}
