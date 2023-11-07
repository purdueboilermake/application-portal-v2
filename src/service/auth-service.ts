import { FirebaseApp } from "firebase/app";
import { Auth, User, getAuth } from "firebase/auth";

export class AuthService {

    private readonly auth: Auth;

    constructor(firebaseApp: FirebaseApp) {
        this.auth = getAuth(firebaseApp);

    }

    async currentUser(): Promise<User | null> {
        await this.auth.authStateReady();
        return this.auth.currentUser;
    }

    async authenticated(): Promise<boolean> {
        const user = await this.currentUser();
        return user !== null;
    }
}
