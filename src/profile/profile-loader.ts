import { LoaderFunction, redirect } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";

export const profilePageLoader: LoaderFunction = async () => {
    const authService = ServiceContainer.instance().authService;

    const currentUser = await authService.currentUser();
    if (currentUser === null) {
        return redirect('login');
    }

    return currentUser;
}
