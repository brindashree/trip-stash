import { Flex, Image, Heading, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../../utility/colors";

function PublicCard({
  title,
  status,
  onClick,
}: {
  title: string;
  status: string;
  onClick: () => void;
}) {
  return (
    <Flex
      onClick={onClick}
      cursor={"pointer"}
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
      <Heading mt={2} as="h4" size="md" textTransform={"capitalize"}>
        {title}
      </Heading>
      <Tag
        color={COLORS.white}
        background={COLORS.primaryColor}
        mt={2}
        width={"fit-content"}
      >
        <TagLabel> {status}</TagLabel>
      </Tag>
    </Flex>
  );
}

export default PublicCard;
