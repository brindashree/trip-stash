import { Flex, Image, Heading, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../../utility/colors";
import PlaceHolder from "../../assets/placeholder.png";
function PublicCard({
  title,
  status,
  onClick,
  image,
}: {
  title: string;
  status: string;
  onClick: () => void;
  image: string;
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
        objectFit="cover"
        src={image || PlaceHolder}
        alt="Caffe Latte"
        width={{ base: "100%"}}
        height={{ base: "300px" }}
        borderRadius={"md"}
        border={!image ? `1px solid ${COLORS.greyNeutral100}` : "unset"}
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
