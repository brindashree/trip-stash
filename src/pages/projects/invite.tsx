import React from "react";
import {
  useList,
  HttpError,
  useGetIdentity,
  useNavigation,
  useParsed,
} from "@refinedev/core";

import {
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Image,
  Toast,
} from "@chakra-ui/react";
import { supabaseClient } from "../../utility";
import { IUser } from "../../utility/interface";

const ProjectInvalidState: React.FC = () => {
  return (
    <Flex direction="column" justifyContent={"center"} alignItems={"center"}>
      <Heading as="h1" size="lg" mb={4}>
        Invalid invite
      </Heading>
      <Image
        minWidth={"30%"}
        width={"30%"}
        src={
          "https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        alt="Invite"
      />
    </Flex>
  );
};

export function Invite() {
  const { params } = useParsed();
  const { data: user } = useGetIdentity<IUser>();
  const { push } = useNavigation();
  const { data } = useList<HttpError>({
    resource: "projects",
    filters: [
      {
        field: "id",
        operator: "eq",
        value: params?.projectId,
      },
    ],
  });

  const checkIfUserIsCollaborator = () => {
    let exists = false;
    const _collaborators = projectDetails?.collaborators || [];
    _collaborators.forEach((_user: any) => {
      if (_user.id === user?.id) {
        exists = true;
      }
    });

    return exists;
  };

  const onProjectJoin = async () => {
    const exists = checkIfUserIsCollaborator();
    if (exists) {
      push("/projects");
    }

    const _collaborators = projectDetails?.collaborators || [];
    if (user?.id && !exists) {
      _collaborators.push({
        id: user?.id,
        email: user?.email,
      });

      await supabaseClient
        .from("projects")
        .update({ collaborators: _collaborators })
        .eq("id", params?.projectId);
    }

    push("/projects");
  };

  const projectDetails = data?.data?.[0] || null;

  if (!data?.data?.length) {
    return <ProjectInvalidState />;
  }

  return (
    <Flex direction="column" justifyContent={"center"} alignItems={"center"}>
      <Heading as="h1" size="lg" mb={4}>
        Join the project
      </Heading>
      <Image
        minWidth={"30%"}
        width={"30%"}
        src={
          "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        alt="Invite"
      />
      <Card mt={4} width={"30%"}>
        <CardHeader textAlign={"center"}>
          <Heading as="h2" size="md">
            {projectDetails?.title}
          </Heading>
          <Heading as="h3" size="sm">
            {projectDetails?.description}
          </Heading>
          <Button mt={4} colorScheme="blue" onClick={onProjectJoin}>
            {checkIfUserIsCollaborator() ? "Joined !!, Go to projects" : "Join"}
          </Button>
        </CardHeader>
      </Card>
    </Flex>
  );
}
