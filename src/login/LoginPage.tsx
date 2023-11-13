import { Alert, Button, Container, Loader, Stack, Text } from "@mantine/core";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";
import { useCallback, useMemo, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { GitHubLoginButton } from "./GithubLoginButton";

export function LoginPage() {

  const applicationService = useMemo(() => ServiceContainer.instance().applicationService, []);
  const auth = getAuth();
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [indicatorMessage, setIndicatorMessage] = useState<string | null>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string | null>(null);

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
    } catch (err: unknown) {
      setLoading(false);
      setIndicatorMessage(null);
      if (err instanceof Error) {
        setLoginErrorMsg(`${err.name} - ${err.message}`);
      } else {
        setLoginErrorMsg(err?.toString?.call(err) ?? 'Unknown error');
      }
    }
  }, [auth, navigator, applicationService]);


  const isPhoneDevice = useMediaQuery('(max-width: 575px)');
  return (
    <Container pt={isPhoneDevice ? 100 : undefined}>
      <Stack>
        <GitHubLoginButton onClick={loginWithGithub} />
        { loading &&
          <Loader />
        }
        { indicatorMessage &&
          <Text>{indicatorMessage}</Text>
        }
        { loginErrorMsg &&
          <Alert variant="filled" title="Login Error" color="red">
            <p>
              An error occured while trying to login. Please try again.
            </p>
            <code>
              {loginErrorMsg}
            </code>
          </Alert>
        }
      </Stack>
    </Container>
  )
}

