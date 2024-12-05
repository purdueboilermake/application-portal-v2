"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Paper,
  Title,
  Stack,
  Grid,
  Card,
  Text,
  Avatar,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { ServiceContainer } from "../service/service-container";
import { User } from "firebase/auth";

interface Invite {
  email: string;
}

interface InviteComponentProps {
  invites: Invite[];
  teamMembers: Invite[];
  isTeamLeader: boolean;
  isTeamMember: boolean;
  currentUser: User;
}

export default function InviteComponent({
  invites,
  teamMembers,
  isTeamLeader,
  isTeamMember,
  currentUser,
}: InviteComponentProps) {
  const teamsService = useMemo(
    () => ServiceContainer.instance().teamsService,
    []
  );

  const [teamLeader, setTeamLeader] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamLeader = async () => {
      if (isTeamMember) {
        const leader = await teamsService.getTeamLeader(currentUser);
        console.log(leader);
        setTeamLeader(leader);
      }
    };
    fetchTeamLeader();
  }, [isTeamMember, teamsService, currentUser]);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleInvite = async (values: { email: string }) => {
    // Simulating an API call
    // teamsService.addUserToTeam()
    notifications.show({
      title: "Invitation Sent",
      message: `Invitation sent to ${values.email}`,
      color: "green",
    });
    form.reset();
  };

  const handleCreateTeam = async () => {
    notifications.show({
      title: "Create Team",
      message: "Creating your team...",
      color: "blue",
      autoClose: 1000,
    });
    await teamsService.createTeamForLeaderUser(currentUser);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const handleAcceptInvite = async (email: string) => {
    notifications.show({
      title: "Invite Accepted",
      message: "You have joined the team!",
      color: "green",
    });
    await teamsService.inviteUserToTeam(currentUser, email);
    await teamsService.removeInviteToTeam(currentUser, email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const handleRejectInvite = async (email: string) => {
    notifications.show({
      title: "Invite Rejected",
      message: "Invite has been rejected",
      color: "red",
    });
    await teamsService.removeInviteToTeam(currentUser, email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const handleDeleteTeam = async () => {
    teamsService.deleteTeamForUser(currentUser);
    notifications.show({
      title: "Team Deleted",
      message: "Deleting your team...",
      color: "red",
    });
    await teamsService.deleteTeamForUser(currentUser);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  };

  const handleDeleteMember = (email: string) => async () => {
    await teamsService.removeMemberFromTeam(currentUser, email);
    notifications.show({
      title: "Member Removed",
      message: "Member has been removed",
      color: "red",
    });
    window.location.reload();
  };

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <Grid>
        <Grid.Col span={6}>
          {isTeamMember ? (
            <Stack justify="md">
              <Title order={2}>
                You are already a member of a team led by {teamLeader}.
              </Title>
            </Stack>
          ) : null}
          {isTeamLeader ? (
            <Stack justify="md">
              <Title order={2}>Invite Team Member</Title>
              <form onSubmit={form.onSubmit(handleInvite)}>
                <TextInput
                  required
                  label="Email Address"
                  placeholder="colleague@example.com"
                  {...form.getInputProps("email")}
                />
                <Group justify="apart" mt="xl">
                  <Button type="submit">Invite</Button>
                  <Button type="button" color="red" onClick={handleDeleteTeam}>
                    Delete Team
                  </Button>
                </Group>
              </form>
            </Stack>
          ) : (
            !isTeamMember && (
              <Stack justify="md">
                <Title order={2}>Create a new team</Title>
                <Button variant="outline" onClick={handleCreateTeam}>
                  Create Team
                </Button>
              </Stack>
            )
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack justify="md">
            {isTeamLeader || isTeamMember ? (
              <Title order={2}>Team members</Title>
            ) : (
              <Title order={2}>Incoming Invites</Title>
            )}
            {!isTeamLeader && !isTeamMember && invites.length === 0 ? (
              <Text color="dimmed">No pending invites</Text>
            ) : (
              invites.map((invite) => (
                <Card
                  key={invite.email}
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                >
                  <Group justify="space-between">
                    <Group>
                      <Avatar color="blue" radius="xl">
                        {invite.email[0]}
                      </Avatar>
                      <div>
                        <Text fw={500}>{invite.email}</Text>
                        <Text size="sm" c="dimmed">
                          {invite.email}
                        </Text>
                      </div>
                    </Group>
                    <Group>
                      <Button
                        size="xs"
                        variant="outline"
                        color="green"
                        onClick={() => handleAcceptInvite(invite.email)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        color="red"
                        onClick={() => handleRejectInvite(invite.email)}
                      >
                        Reject
                      </Button>
                    </Group>
                  </Group>
                </Card>
              ))
            )}
            {(isTeamLeader || isTeamMember) && teamMembers.length === 0 ? (
              <Text color="dimmed">No team members</Text>
            ) : (
              teamMembers.map((member) => {
                if (!isTeamLeader && !isTeamMember) {
                  return;
                }
                return (
                  <Card
                    key={member.email}
                    shadow="sm"
                    p="md"
                    radius="md"
                    withBorder
                  >
                    <Group justify="space-between">
                      <Group>
                        <Avatar color="blue" radius="xl">
                          {member.email[0]}
                        </Avatar>
                        <div>
                          <Text fw={500}>{member.email}</Text>
                          <Text size="sm" c="dimmed">
                            {member.email}
                          </Text>
                        </div>
                      </Group>
                      <Group>
                        {isTeamLeader && (
                          <Button
                            size="xs"
                            variant="outline"
                            color="red"
                            onClick={handleDeleteMember(member.email)}
                          >
                            Remove
                          </Button>
                        )}
                      </Group>
                    </Group>
                  </Card>
                );
              })
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
