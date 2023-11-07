import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { CollectionReference, Firestore, collection, getFirestore, where, query, getDocs,  DocumentReference, addDoc, getDoc, doc } from "firebase/firestore";
import { BoilermakeApplication, defaultBoilermakeApplication } from "./application";

export class ApplicationService {
    private readonly firestore: Firestore;
    private readonly applications: CollectionReference;

    constructor(firebaseApp?: FirebaseApp) {
        if (firebaseApp) {
            this.firestore = getFirestore(firebaseApp);
        } else {
            this.firestore = getFirestore();
        }
        this.applications = collection(this.firestore, 'application');
    }

    async findApplication(id: string): Promise<DocumentReference | null> {
        const appRef = doc(this.applications, id);
        const docSnapshot = await getDoc(appRef);
        if (docSnapshot.exists()) {
            return appRef;
        } else {
            return null;
        }
    }

    async userOwnsApplication(appDoc: DocumentReference, user: User): Promise<boolean> {
        const snapshot = await getDoc(appDoc);
        const docData = snapshot.data() as BoilermakeApplication;
        return docData.email === user.email;
    }

    async getOrCreateUserApplication(user: User): Promise<DocumentReference> {
        let existingForm = await this.findUserForm(user);
        if (!existingForm) {
            existingForm = await this.createApplicationForUser(user);
        }

        return existingForm;
    }

    private async findUserForm(user: User): Promise<DocumentReference | null> {
        const documents = await getDocs(query(this.applications, where('email', '==', user.email)));
        if (documents.empty) {
            return null;
        }

        return documents.docs[0].ref;
    }

    private async createApplicationForUser(user: User): Promise<DocumentReference> {
        return addDoc(this.applications, {
            ...defaultBoilermakeApplication,
            email: user.email,
            phone: user.phoneNumber ?? '', // it might be provided??
        } as BoilermakeApplication);
    }
}
