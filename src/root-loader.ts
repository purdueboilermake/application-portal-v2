import { LoaderFunction, ShouldRevalidateFunction, ShouldRevalidateFunctionArgs, redirect } from "react-router-dom";
import { ServiceContainer } from "./service/service-container";

export const rootLoader: LoaderFunction = async () => {
    const authService = ServiceContainer.instance().authService;
    const appService = ServiceContainer.instance().applicationService;
    // if the user is not authenticated, then login them in
    const currentUser = await authService.currentUser();
    if (currentUser === null) {
        return redirect('login');
    }

    // otherwise, find the application for the given user and go there
    const userApplication = await appService.getOrCreateUserApplication(currentUser);
    return redirect(`/application/${userApplication.id}`);
}

// don't revalidate the loader when navigating to the login page from the root page
export const rootLoaderShouldRevalidate: ShouldRevalidateFunction = (args: ShouldRevalidateFunctionArgs) => {
    return !(args.currentUrl.pathname === '/' && args.nextUrl.pathname === '/login');
}
