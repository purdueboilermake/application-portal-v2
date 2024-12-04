import { LoaderFunction, redirect } from "react-router-dom";
import { ServiceContainer } from "../service/service-container";

export const teamsLoader: LoaderFunction = async () => {
    const teamsService = ServiceContainer.instance().teamsService;
    const authService = ServiceContainer.instance().authService;

    const currentUser = await authService.currentUser();
    if (!currentUser) {
        return redirect('/login');
    }

    const existingTeamLeader = await teamsService.findTeamByLeaderUser(currentUser);
    const existingTeamMembers = await teamsService.findTeamsByMemberUser(currentUser);
    const existingTeamInvites = await teamsService.findTeamByInvitedUser(currentUser);
    
    if(existingTeamLeader){
        return {
            docRef: existingTeamLeader,
            currentUser: currentUser,
            isLeader: true,
            isMember: false
        }
    }
    else if(existingTeamMembers){
        return {
            docRef: existingTeamMembers,
            currentUser: currentUser,
            isLeader: false,
            isMember: true
        }
    }
    else if(!existingTeamLeader && existingTeamInvites){
        // not a team leader, but they have invites
        return {
            docRef: existingTeamInvites,
            currentUser: currentUser,
            isLeader: false,
            isMember: false
        }
        
    } else if(!existingTeamLeader && !existingTeamInvites){
        // not a leader nor do they have invites
        return {
            docRef: null,
            currentUser: currentUser,
            isLeader: false,
            isMember: false
        }
    }
}