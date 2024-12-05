export interface BoilermakeTeam {
    teamLeaderGitHubEmail: string,
    memberGitHubEmails: string[]
    pendingMemberGitHubEmails: string[]
}

export const defaultBoilermakeTeam : BoilermakeTeam = {
    teamLeaderGitHubEmail: "",
    memberGitHubEmails: [],
    pendingMemberGitHubEmails: []
}