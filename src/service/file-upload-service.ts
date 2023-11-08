import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { FirebaseStorage, deleteObject, getDownloadURL, getMetadata, getStorage, ref, uploadBytes } from 'firebase/storage';

const makeRef = (storage: FirebaseStorage, user: User) => {
    return ref(storage, `/resumes/${user.uid}-resume.pdf`);
}

export interface ResumeFileInfo {
    name: string;
    downloadLink: string;
}

export class FileUploadService {

    private readonly storage: FirebaseStorage;

    constructor(firebaseApp: FirebaseApp) {
        this.storage = getStorage(firebaseApp);
    }

    async createOrReplaceUserResume(user: User, file: File): Promise<ResumeFileInfo> {
        const userRef = makeRef(this.storage, user);

        // delete if it already exists
        const existingResume = await this.existingResumeInfo(user);
        if (existingResume) {
            await deleteObject(userRef);
        }

        const result = await uploadBytes(userRef, file, { contentType: 'application/pdf', customMetadata: { originalFileName: file.name } })
        const downloadURL = await getDownloadURL(result.ref);

        return {
            name: file.name,
            downloadLink: downloadURL
        };
    }

    async existingResumeInfo(user: User): Promise<ResumeFileInfo | null> {
        const userRef = makeRef(this.storage, user);
        return getMetadata(userRef)
            .then(async metadata => {
                if (!metadata) {
                    return null;
                }

                const origName = metadata.customMetadata?.originalFileName ?? 'resume.pdf';
                const url = await getDownloadURL(userRef);

                return {
                    name: origName,
                    downloadLink: url
                } as ResumeFileInfo;
            })
            .catch(() => null);
    }
}
