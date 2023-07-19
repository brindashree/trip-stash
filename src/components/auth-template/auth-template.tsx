import React from "react";
import { useIsAuthenticated, useNavigation } from "@refinedev/core";
import { Flex } from "@chakra-ui/react";

function AuthTemplate({ children }: { children: React.ReactNode }) {
  const { data } = useIsAuthenticated();
  const { push } = useNavigation();

  if (data?.authenticated) push("/projects");

  return (
    <div
      style={{
        background:
          "url(https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex
        mr={{ base: 0, lg: 16 }}
        direction={{ base: "row", lg: "row-reverse" }}
      >
        {children}
      </Flex>
    </div>
  );
}

export default AuthTemplate;
