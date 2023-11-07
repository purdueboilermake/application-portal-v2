import { Button, Center } from "@mantine/core";
import { Auth, GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";
import { ApplicationService } from "../service/application-service";

const loginWithGithub = (auth: Auth, applicationService: ApplicationService, navigator: NavigateFunction) => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      return applicationService.getOrCreateUserApplication(user);
    })
    .then(userApplication => {
      console.log(`Got user application id ${userApplication.id}`);
      navigator(`/application/${userApplication.id}`);
    })
}

export function LoginPage() {

  const applicationService = ServiceContainer.instance().applicationService;
  const auth = getAuth();
  const navigator = useNavigate();

  return (
    <Center h={100}>
      <Button onClick={() => loginWithGithub(auth, applicationService, navigator)}>Login with GitHub</Button>
    </Center>
  )
}

