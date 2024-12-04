import { Card } from "@mantine/core";
import { GenericPage } from "../GenericPage";
import { useLoaderData } from "react-router-dom";
import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import InviteComponent from "./InviteUser";
import { useState, useEffect } from "react";

const TeamsPage = () => {
  const { docRef, currentUser, isLeader, isMember } = useLoaderData() as {
    docRef: DocumentReference<DocumentData, DocumentData> | DocumentData[];
    currentUser: User;
    isLeader: boolean;
    isMember: boolean;
  };
  const [invites, setInvites] = useState<{ email: string }[]>([]);
  const [members, setTeamMembers] = useState<{ email: string }[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (isLeader) {
        const leaderDocRef = docRef as DocumentReference<
          DocumentData,
          DocumentData
        >;
        const emails = (await getDoc(leaderDocRef)).data()
          ?.memberGitHubEmails as string[];
        emails.push(
          (await getDoc(leaderDocRef)).data()?.teamLeaderGitHubEmail as string
        );
        setTeamMembers(
          emails.map((email: string) => ({
            email: email,
          }))
        );
      } else if (isMember) {
        const leaderDocRef = docRef as DocumentReference<
          DocumentData,
          DocumentData
        >;
        const emails = (await getDoc(leaderDocRef)).data()
          ?.memberGitHubEmails as string[];
        emails.push(
          (await getDoc(leaderDocRef)).data()?.teamLeaderGitHubEmail as string
        );
        setTeamMembers(
          emails.map((email: string) => ({
            email: email,
          }))
        );
      }
    };

    const fetchInvites = async () => {
      if (!isLeader) {
        const invitesDocRef = docRef as DocumentData[];
        const incoming: { email: string }[] = [];
        invitesDocRef.forEach((doc) => {
          const leaderEmail = doc.data().teamLeaderGitHubEmail as string;
          incoming.push({
            email: leaderEmail,
          });
        });
        console.log(incoming);
        setInvites(incoming);
      }
    };

    const fetchData = async () => {
      await fetchTeamMembers();
      await fetchInvites();
    };

    fetchData();
  }, [docRef, isLeader, isMember]);

  return (
    <GenericPage>
      <Card>
        <InviteComponent
          isTeamLeader={isLeader}
          invites={invites}
          currentUser={currentUser}
          isTeamMember={isMember}
          teamMembers={members}
        />
      </Card>
    </GenericPage>
  );
};

export default TeamsPage;
