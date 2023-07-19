import { Container, Box, Flex, Text, Button } from "@chakra-ui/react";
import {
  IconBriefcase,
  IconHome,
  IconHome2,
  IconSmartHome,
  IconLogout,
} from "@tabler/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { supabaseClient } from "../../utility";
import { Logo } from "../../assets/logo";
import { COLORS } from "../../utility/colors";

export const CustomSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate("/");
  };

  return (
    <Container width={"25vh"} py={8} bg={COLORS.white}>
      <Box cursor={"pointer"} onClick={() => navigate("/")} mb={4}>
        <Flex alignItems={"center"}>
          <Logo />
          <div>
            <Text fontSize="lg" ml={4} as="b">
              TripStash
            </Text>
          </div>
        </Flex>
      </Box>
      <Button
        variant={"ghost"}
        leftIcon={<IconSmartHome />}
        width={"full"}
        iconSpacing={"3"}
        size={"lg"}
        onClick={() => {
          navigate("/home");
        }}
        mt={2}
        fontSize={"sm"}
        isActive={location.pathname === "/home"}
      >
        <Text width={"90%"}>Home</Text>
      </Button>

      <Button
        variant={"ghost"}
        leftIcon={<IconBriefcase />}
        width={"full"}
        iconSpacing={"3"}
        size={"lg"}
        fontSize={"sm"}
        my={2}
        onClick={() => {
          navigate("/projects");
        }}
        isActive={location.pathname === "/projects"}
      >
        <Text width={"90%"}>Project</Text>
      </Button>
      <Button
        variant={"ghost"}
        leftIcon={<IconLogout />}
        width={"full"}
        iconSpacing={"3"}
        size={"lg"}
        fontSize={"sm"}
        onClick={onLogout}
      >
        <Text width={"90%"}>Logout</Text>
      </Button>
    </Container>
  );
};
