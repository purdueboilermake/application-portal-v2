import { FirebaseApp, getApp } from "firebase/app";
import { ApplicationService } from "./application-service";
import { AuthService } from "./auth-service";
import { FileUploadService } from "./file-upload-service";
import { TeamsService } from "./teams-service";

export class ServiceContainer {
    private static _instance: ServiceContainer | null = null;

    public readonly applicationService: ApplicationService;
    public readonly authService: AuthService;
    public readonly fileUploadService: FileUploadService;
    public readonly teamsService: TeamsService;

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
        this.authService = new AuthService(firebaseApp);
        this.fileUploadService = new FileUploadService(firebaseApp);
        this.applicationService = new ApplicationService(this.fileUploadService, firebaseApp);
        this.teamsService = new TeamsService(firebaseApp);
    }
}
