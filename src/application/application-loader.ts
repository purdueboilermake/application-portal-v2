import { LoaderFunction, redirect } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";

export const loadApplicationOrLoginLoader: LoaderFunction = async ({ params }) => {
    const applicationService = ServiceContainer.instance().applicationService;
    const authService = ServiceContainer.instance().authService;
    const applicationId = params.appId as string;

    const currentUser = await authService.currentUser();

    if (!currentUser) {
        return redirect('/login');
    }

    const existingReference = await applicationService.findApplication(applicationId);


    if (!existingReference) {
        // THIS doesn't exist...
        const docRef = await applicationService.getOrCreateUserApplication(currentUser);
        return redirect(`/application/${docRef.id}`);
    }

    const owns = await applicationService.userOwnsApplication(existingReference, currentUser);
    if (!owns) {
        // unauthenticated error
        return redirect('/profile');
    }

    return existingReference;
}