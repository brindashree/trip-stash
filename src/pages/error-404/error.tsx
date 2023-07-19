import React from "react";
import { ErrorImg } from "../../assets/error-404";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { IconHome } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utility/colors";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ErrorImg />
      <Flex flexDirection={"column"} textAlign={"center"} gap={4} mt={16}>
        <Text as="b" fontSize={"2xl"}>
          Uh oh..
        </Text>
        <Text as="b" fontSize={"5xl"}>
          Something went wrong
        </Text>
        <Text>Looks like this page doesn't exist or was removed</Text>
        <Button
          leftIcon={<IconHome />}
          bg={COLORS.primaryColor}
          width={"fit-content"}
          alignSelf={"center"}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
      </Flex>
    </Container>
  );
};
