import { LoaderFunction, redirect } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";
import { notifications } from '@mantine/notifications';

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
        notifications.show({
            title: `Application does not exist`,
            message: 'Redirected you to your application',
            autoClose: 3000,
        });
        return redirect(`/application/${docRef.id}`);
    }

    const owns = await applicationService.userOwnsApplication(existingReference, currentUser);
    if (!owns) {
        // unauthenticated error
        notifications.show({
            title: 'You Cannot View This Application',
            message: "You don't own this application. Taking you to your profile...",
        })
        return redirect('/profile');
    }

    return existingReference;
}