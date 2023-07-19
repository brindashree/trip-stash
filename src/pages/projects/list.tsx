import { useEffect, useState } from "react";
import { Text, Container, Circle, Stack, Flex } from "@chakra-ui/react";
import { CreateButton } from "@refinedev/chakra-ui";
import { useList, HttpError, useGetIdentity } from "@refinedev/core";

import { COLORS } from "../../utility/colors";
import { ExploreIcon } from "../../assets/explore-icon";
import { ProjectCard } from "../../components/project-card";
import { IUser } from "../../utility/interface";

const ProjectEmptyState: React.FC = () => {
  return (
    <Container centerContent minHeight="80vh" justifyContent="center">
      <Text fontSize="5xl" color={COLORS.primaryColor} as="b">
        Welcome, #Username
      </Text>
      <Stack spacing={18} alignItems="center">
        <Circle size="64px" bg={COLORS.greyNeutral} color="black" mt={24}>
          <ExploreIcon />
        </Circle>
        <Text fontSize="4xl" as="b">
          Hey there, Explorer!
        </Text>
        <Text fontSize="xl" textAlign="center">
          Ready to kick-start your journey? Create your first travel project on
          TripStash!
        </Text>
      </Stack>
      <CreateButton bg={COLORS.primaryColor} mt={4} />
    </Container>
  );
};

export const Projects: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();
  const [personalStash, setPersonalStash] = useState<any[]>([]);
  const [collaboratorStash, setCollaboratorStash] = useState<any[]>([]);

  const { data: projects } = useList<HttpError>({
    resource: "projects",
  });

  useEffect(() => {
    if (projects) {
      const _personalStash = projects?.data?.filter((project: any) => {
        if (project?.user_id === user?.id) {
          return project;
        }
      });

      const _collaboratorStash = projects?.data?.filter((project: any) => {
        if (
          project?.collaborators?.some(
            (collaborator: any) => collaborator?.id === user?.id
          )
        ) {
          return project;
        }
      });

      setPersonalStash(_personalStash);
      setCollaboratorStash(_collaboratorStash);
    }
  }, [projects, user?.id]);

  const userHasProjects =
    personalStash?.length > 0 || collaboratorStash?.length > 0;

  return (
    <>
      {userHasProjects ? (
        <div>
          <Flex justifyContent="space-between" alignItems="center" mb={8}>
            <div>
              <Text fontSize="2xl" as="b">
                Your stash
              </Text>
              <Text fontSize="sm" color={COLORS.greyNeutral500}>
                View and manage all the projects created by you
              </Text>
            </div>
            <CreateButton bg={COLORS.primaryColor} />
          </Flex>
          <Flex gap={8} flexDirection={"column"}>
            {personalStash.map((proj) => (
              <ProjectCard
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
          </Flex>

          {collaboratorStash?.length ? (
            <>
              <Flex
                mt={16}
                justifyContent="space-between"
                alignItems="center"
                mb={8}
              >
                <div>
                  <Text fontSize="2xl" as="b">
                    Collaboration Stash
                  </Text>
                  <Text fontSize="sm" color={COLORS.greyNeutral500}>
                    View and manage all the projects you are collaborating on
                  </Text>
                </div>
              </Flex>
              <Flex gap={8} flexDirection={"column"}>
                {collaboratorStash.map((proj) => (
                  <ProjectCard
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
              </Flex>
            </>
          ) : null}
        </div>
      ) : (
        <ProjectEmptyState />
      )}
    </>
  );
};
