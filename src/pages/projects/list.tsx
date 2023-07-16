import {
  Text,
  Container,
  Circle,
  Stack,
  Button,
  useDisclosure,
  Flex
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons";

import { COLORS } from "../../utility/colors";
import { ExploreIcon } from "../../assets/explore-icon";
import { ProjectCard } from "../../components/project-card";
import { CreateButton } from "@refinedev/chakra-ui";

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
      <CreateButton mt={4}/>
    </Container>
  );
};

export const Projects: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userHasProjects = false;
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
            <Button
              leftIcon={<IconPlus />}
              bg={COLORS.primaryColor}
              variant="solid"
              onClick={onOpen}
            >
              Create Project
            </Button>
            <CreateButton/>
          </Flex>

          <ProjectCard />
        </div>
      ) : (
        <ProjectEmptyState />
      )}
    </>
  );
};
