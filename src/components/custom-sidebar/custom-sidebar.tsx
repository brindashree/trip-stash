import { Container, Box, Flex, Text, Button } from "@chakra-ui/react";
import { IconBriefcase, IconHome, IconLogout } from "@tabler/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { supabaseClient } from "../../utility";
import { Logo } from "../../assets/logo";
import { COLORS } from "../../utility/colors";

export const CustomSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container width={"25vh"} py={8} bg={COLORS.white}>
      <Box mb={4}>
        <Flex alignItems={"center"}>
          <Logo />
          <div>
            <Text fontSize="lg" ml={4} as="b">
              TripStash
            </Text>
            <Text fontSize="xs" ml={4} color={COLORS.neutral600}>
              Explore. Plan. Stash. Repeat
            </Text>
          </div>
        </Flex>
      </Box>
      <Button
        variant={"ghost"}
        leftIcon={<IconHome />}
        width={"full"}
        iconSpacing={"3"}
        size={"lg"}
        onClick={() => {
          navigate("/home");
        }}
        fontSize={"sm"}
        isActive={location.pathname === '/home'}
      >
        Home
      </Button>
      <Button
        variant={"ghost"}
        leftIcon={<IconBriefcase />}
        width={"full"}
        iconSpacing={"3"}
        size={"lg"}
        fontSize={"sm"}
        onClick={() => {
          navigate("/projects");
        }}
        isActive={location.pathname === '/projects'}
      >
        Projects
      </Button>
      <Button
        variant={"ghost"}
        leftIcon={<IconLogout />}
        width={"full"}
        iconSpacing={"3"}
        size={"lg"}
        fontSize={"sm"}
        onClick={async () => await supabaseClient.auth.signOut()}
      >
        Logout
      </Button>
    </Container>
  );
};
