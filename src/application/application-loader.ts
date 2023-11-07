import { LoaderFunction, redirect } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";

export const loadApplicationOrLoginLoader: LoaderFunction = async ({ params }) => {
    const applicationService = ServiceContainer.instance().applicationService;
    const authService = ServiceContainer.instance().authService;
    const applicationId = params.appId as string;

    if (!authService.authenticated) {
        return redirect('/login');
    }

    const currentUser = authService.currentUser!;

    const existingReference = await applicationService.findApplication(applicationId);


    if (!existingReference) {
        // THIS doesn't exist...
        return;
    }

    const owns = await applicationService.userOwnsApplication(existingReference, currentUser);
    if (!owns) {
        // unauthenticated error
    }

    return existingReference;
}