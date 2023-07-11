import {
  Text,
  Container,
  Circle,
  Stack,
  Button,
  useDisclosure,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons";

import { COLORS } from "../../utility/colors";
import { ExploreIcon } from "../../assets/explore-icon";
import { AddProject } from "../../components/forms/add-project";
import { ProjectCard } from "../../components/project-card";

const ProjectEmptyState: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Button
        leftIcon={<IconPlus />}
        bg={COLORS.primaryColor}
        mt={18}
        variant="solid"
        onClick={onOpen}
      >
        Create Project
      </Button>
      <AddProject isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export const Projects: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userHasProjects = true;
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
          </Flex>
          <AddProject isOpen={isOpen} onClose={onClose} />
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Public</Tab>
              <Tab>Private</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProjectCard />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <ProjectEmptyState />
      )}
    </>
  );
};
