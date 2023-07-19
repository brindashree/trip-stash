import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { IUser } from "../../utility/interface";
import { IconPlus } from "@tabler/icons";
import { COLORS } from "../../utility/colors";
import { useEffect, useState } from "react";
import {
  useList,
  HttpError,
  useGetIdentity,
  useNavigation,
} from "@refinedev/core";
import { ProjectCard } from "../../components/project-card";
import PublicCard from "../../components/public-card";

export function Home() {
  const { push } = useNavigation();
  const { data: user } = useGetIdentity<IUser>();
  const [personalStash, setPersonalStash] = useState<any[]>([]);
  const [publicStash, setPublicStash] = useState<any[]>([]);

  const { data: projects } = useList<HttpError>({
    resource: "projects",
  });

  useEffect(() => {
    if (projects) {
      const _personalStash = projects?.data?.filter(
        (project: any) => project?.user_id === user?.id
      );
      const _publicStash = projects?.data?.filter(
        (project: any) => project?.user_id !== user?.id && !project.private
      );
      setPersonalStash(_personalStash);
      setPublicStash(_publicStash);
    }
  }, [projects, user?.id]);

  return (
    <div>
      <div>
        <Heading as="h2" size="xl" mb="4">
          Welcome back, {user?.email}
        </Heading>
        <Flex gap="4">
          <Card>
            <CardHeader>
              <Text>Your active projects</Text>
            </CardHeader>
            <CardBody>
              <Heading as="h1" size="2xl">
                {personalStash?.length || 0}
              </Heading>
            </CardBody>
          </Card>

          <Card
            backgroundColor={COLORS.primaryColor}
            color={"white"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={4}
            flexWrap={"nowrap"}
            flexDirection={"row"}
            cursor={"pointer"}
            onClick={() => push("/projects/create")}
          >
            <IconPlus />
            Create a new project
          </Card>
        </Flex>
      </div>
      <Spacer height={100} />
      <div>
        <Heading as="h2" size="xl" mb="4">
          Your Stash
        </Heading>
        <Heading as="h4" size="xs" mb="4" color={COLORS.greyNeutral500}>
          View and manage all the projects you are a part of here
        </Heading>

        {personalStash.map((proj: any) => (
          <ProjectCard
            key={proj.id}
            title={proj.title}
            start_date={proj.start_date}
            end_date={proj.end_date}
            destination={proj.destination}
            description={proj.description}
            id={proj.id}
            status={proj.status}
            user_id={proj.user_id}
            is_private={proj.private}
            collaborators={proj.collaborators}
            {...proj}
          />
        ))}
      </div>

      <div>
        <Heading as="h2" size="xl" mb="4">
          Public Stash
        </Heading>
        <Heading as="h4" size="xs" mb="4" color={COLORS.greyNeutral500}>
          See what other people are working on
        </Heading>

        <Flex gap={4} alignItems={"center"} flexWrap={"wrap"}>
          {publicStash.map((proj: any) => (
            <PublicCard key={proj.id} title={proj.title} />
          ))}
        </Flex>
      </div>
    </div>
  );
}
