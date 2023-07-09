import { Text, Container, Circle, Stack, Button } from "@chakra-ui/react";
import { COLORS } from "../../utility/colors";
import { ExploreIcon } from "../../assets/explore-icon";
import { IconPlus } from "@tabler/icons";

export const Projects: React.FC = () => {
  return (
    <Container centerContent minHeight="80vh" justifyContent="center">
      <Text fontSize="5xl" color={COLORS.primaryColor} as="b">
        Welcome, #Username
      </Text>
      <Stack spacing={18} alignItems="center">
        <Circle size="64px" bg={COLORS.greyNeutral} color="black" mt={24}>
          <ExploreIcon />
        </Circle>
        <Text fontSize="4xl">Hey there, Explorer!</Text>
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
      >
        Create Project
      </Button>
    </Container>
  );
};
