import { FirebaseApp, getApp } from "firebase/app";
import { ApplicationService } from "./application-service";
import { AuthService } from "./auth-service";

export class ServiceContainer {
    private static _instance: ServiceContainer | null = null;

    public readonly applicationService: ApplicationService;
    public readonly authService: AuthService;

    public static initialize(app?: FirebaseApp) {
        const firebaseApp = app ?? getApp();
        this._instance = new ServiceContainer(firebaseApp)
    }

    public static instance(): ServiceContainer {
        if (!this._instance) {
            ServiceContainer.initialize();
        }
        return this._instance!;
    }

    private constructor(firebaseApp: FirebaseApp) {
        this.applicationService = new ApplicationService(firebaseApp);
        this.authService = new AuthService(firebaseApp);
    }
}
