import { Text, Container, Circle, Stack, Flex } from "@chakra-ui/react";
import { CreateButton } from "@refinedev/chakra-ui";
import { useList, HttpError, useGetIdentity } from "@refinedev/core";

import { COLORS } from "../../utility/colors";
import { ExploreIcon } from "../../assets/explore-icon";
import { ProjectCard } from "../../components/project-card";
import { IProject, IUser } from "../../utility/interface";

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
      <CreateButton mt={4} />
    </Container>
  );
};

export const Projects: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { data: projects } = useList<HttpError>({
    resource: "projects",
    filters: [
      {
        field: "user_id",
        operator: "eq",
        value: user?.id,
      },
    ],
  });
  const userHasProjects = projects?.total && projects.total > 0;

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
            <CreateButton />
          </Flex>
          {projects.data.map((proj) => (
            <ProjectCard
              title={proj.title}
              start_date={proj.start_date}
              end_date={proj.end_date}
              destination={proj.destination}
              description={proj.description}
              id={proj.id}
              status={proj.status}
              {...proj}
            />
          ))}
        </div>
      ) : (
        <ProjectEmptyState />
      )}
    </>
  );
};
