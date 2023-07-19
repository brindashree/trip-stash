import { Flex, Image, CardBody, Heading } from "@chakra-ui/react";
import React from "react";

function PublicCard({ title }: { title: string }) {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      my={8}
      width={{ base: "100%", lg: "24%" }}
    >
      <Image
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        objectFit="cover"
        width={{ base: "100%" }}
        height={{ base: "300px" }}
        borderRadius={"md"}
      />
      <Heading pl={2} mt={2} as="h4" size="md" textTransform={"capitalize"}>
        {title}
      </Heading>
    </Flex>
  );
}

export default PublicCard;
