
export type BoilermakeApplicationStatus = 'UNSUBMITTED' | 'SUBMITTED' | 'DENIED' | 'WAITLISTED' | 'ACCEPTED';

export interface BoilermakeApplication {
    firstName: string;
    lastName: string;
    email: string;
    preferredName: string;
    gender: string;
    age: number;
    githubEmail: string;
    altEmail: string;
    phone: string;
    degree: string;
    school: string;
    major: string;
    year: string;
    country: string;
    whyBM: string;
    projectIdeas: string;
    dietaryRestrictions: string | null;
    shirtSize: string;
    hopeToGetFromBM: string;
    agreeToCodeOfConduct: boolean;
    agreeToTermsAndConditions: boolean;
    recieveCommunications: boolean;
    agreeToRSVP: boolean;
    consentToPhoto: boolean;
    lastSubmitted: Date | null;
    appStatus: BoilermakeApplicationStatus;
}

export const defaultBoilermakeApplication: BoilermakeApplication = {
    firstName: '',
    lastName: '',
    preferredName: '',
    gender:'',
    degree:'',
    email: '',
    githubEmail: '',
    school: '',
    major: '',
    year: '',
    age: 0,
    country: '',
    altEmail: '',
    phone: '',
    whyBM: '',
    projectIdeas: '',
    dietaryRestrictions: '',
    shirtSize: '',
    hopeToGetFromBM: '',
    agreeToCodeOfConduct: false,
    agreeToTermsAndConditions: false,
    recieveCommunications: true,
    agreeToRSVP: false,
    consentToPhoto: false,
    lastSubmitted: null,
    appStatus: 'UNSUBMITTED',
}
