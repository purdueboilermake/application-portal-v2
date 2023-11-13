import { Button, Center, Group, Loader, Text} from "@mantine/core";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";
import { useCallback, useMemo, useState } from "react";
import { notifications } from "@mantine/notifications";

export function LoginPage() {

  const applicationService = useMemo(() => ServiceContainer.instance().applicationService, []);
  const auth = getAuth();
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [indicatorMessage, setIndicatorMessage] = useState<string | null>(null);

  const loginWithGithub = useCallback(async () => {
    setLoading(true);
    setIndicatorMessage('logging in...');
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      setIndicatorMessage('Preparing your application...');
      const userApplication = await applicationService.getOrCreateUserApplication(user);
      console.log(`Got user application id ${userApplication.id}`);
      navigator(`/application/${userApplication.id}`);
    } catch (err) {
      setLoading(false);
      notifications.show({
        title: 'Error',
        message: 'Failed to sign in',
        autoClose: 3000,
      });
    }
  }, [auth, navigator, applicationService]);

  return (
    <Center h={100}>
      <Group>
        <Button onClick={loginWithGithub}>
          Login with GitHub
        </Button>
        { loading &&
          <Loader />
        }
        { indicatorMessage &&
          <Text>{indicatorMessage}</Text>
        }
      </Group>
    </Center>
  )
}

