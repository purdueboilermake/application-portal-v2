import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, CollectionReference, deleteDoc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { BoilermakeTeam, defaultBoilermakeTeam } from "./teams";

export class TeamsService {
    private readonly firestore: Firestore;
    private readonly teams: CollectionReference;

    constructor(firebaseApp: FirebaseApp) {
        if (firebaseApp) {
            this.firestore = getFirestore(firebaseApp);
        } else {
            this.firestore = getFirestore();
        }
        this.teams = collection(this.firestore, 'teams-25');
    }

    async findTeamByLeaderUser(user: User): Promise<DocumentReference | null> {
        const documents = await getDocs(query(this.teams, where('teamLeaderGitHubEmail', '==', user.email)));
        if (documents.empty) {
            return null;
        }

        return documents.docs[0].ref;
    }

    async findTeamByInvitedUser(user: User): Promise<DocumentData[] | null> {
        const documents = await getDocs(query(this.teams, where('pendingMemberGitHubEmails', 'array-contains', user.email)));
        if(documents.empty){
            return null;
        }
        return documents.docs;
    }

    async createTeamForLeaderUser(user: User): Promise<DocumentReference> {
        return addDoc(this.teams, {
            ...defaultBoilermakeTeam,
            teamLeaderGitHubEmail: user.email,
        } as BoilermakeTeam);
    }

    async inviteUserToTeam(user: User, email: string) {
        const documents = await getDocs(query(this.teams, where('teamLeaderGitHubEmail', '==', email)));
        if (documents.empty) {
            throw Error("team does not exist!");
        }
        const teamRef = documents.docs[0].ref;
        updateDoc(teamRef, {
            pendingMemberGitHubEmails: arrayUnion(user.email)
        })
    }

    async removeInviteToTeam(user: User, email: string){
        const documents = await getDocs(query(this.teams, where('teamLeaderGitHubEmail', '==', email)));
        if (documents.empty) {
            throw Error("team does not exist!");
        }
        const teamRef = documents.docs[0].ref;
        updateDoc(teamRef, {
            pendingMemberGitHubEmails: arrayRemove(user.email)
        })
    }

    async deleteTeamForUser(user: User): Promise<void> {
        const teamRef = await this.findTeamByLeaderUser(user);
        if (!teamRef) {
            throw new Error("Team not found for the user");
        }
        await deleteDoc(teamRef);
    }

    async removeMemberFromTeam(leader: User, email: string): Promise<void> {
        const documents = await getDocs(query(this.teams, where('teamLeaderGitHubEmail', '==', leader.email)));
        if (documents.empty) {
            throw new Error("Team does not exist!");
        }
        const teamRef = documents.docs[0].ref;
        const teamData = documents.docs[0].data() as BoilermakeTeam;

        if (teamData.teamLeaderGitHubEmail === email) {
            throw new Error("Cannot remove the team leader from the team");
        }

        await updateDoc(teamRef, {
            memberGitHubEmails: teamData.memberGitHubEmails.filter(memberEmail => memberEmail !== email)
        });
    }

    async moveMemberFromPendingToMember(user: User, team: BoilermakeTeam): Promise<void> {
        const documents = await getDocs(query(this.teams, where('teamLeaderGitHubEmail', '==', team.teamLeaderGitHubEmail)));
        if (documents.empty) {
            throw new Error("Team does not exist!");
        }
        const teamRef = documents.docs[0].ref;
        const teamData = documents.docs[0].data() as BoilermakeTeam;

        if (user.email && !teamData.pendingMemberGitHubEmails.includes(user.email)) {
            throw new Error("User is not in the pending members list");
        }

        await updateDoc(teamRef, {
            pendingMemberGitHubEmails: teamData.pendingMemberGitHubEmails.filter(email => email !== user.email),
            memberGitHubEmails: arrayUnion(user.email)
        });
    }

    async findTeamsByMemberUser(user: User): Promise<DocumentReference | null> {
        const documents = await getDocs(query(this.teams, where('memberGitHubEmails', 'array-contains', user.email)));
        if (documents.empty) {
            return null;
        }
        return documents.docs[0].ref;
    }


    async getTeamLeader(currentUser: User) {
        const teamRef = await this.findTeamsByMemberUser(currentUser);
        if (!teamRef) {
            return null;
        }
        const teamDoc = await getDoc(teamRef);
        const teamData = teamDoc.data() as BoilermakeTeam;
        return teamData.teamLeaderGitHubEmail;
    }
}