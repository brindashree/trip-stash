import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Flex,
  AvatarGroup,
  Avatar,
  Spacer,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { DeleteButton, ShowButton } from "@refinedev/chakra-ui";
import {
  IconMapPin,
  IconClockHour3,
  IconMessage2,
  IconPaperclip,
} from "@tabler/icons";
import { COLORS } from "../../utility/colors";

export const ProjectCard: React.FC = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="filled"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        pt={4}
        pb={4}
        pl={4}
        borderRadius="3xl"
      />
      <CardBody>
        <Flex alignItems="center">
          <Text as="b" fontSize="lg">
            John's Greek Adventure
          </Text>
          <Spacer />
          <AvatarGroup size="md" max={2}>
            <Avatar name="Ryan "  />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </Flex>
        <Flex gap={4} flexDirection={"column"}>
          <Flex gap={4}>
            <Flex gap={2}>
              <IconMapPin size={24} color={COLORS.greyNeutral500} />
              Bangalore
            </Flex>
            <Flex gap={2}>
              <IconClockHour3 size={24} color={COLORS.greyNeutral500} />
              19th Feb - 23rd Feb'23
            </Flex>
          </Flex>

          <Flex gap={4}>
            <Flex gap={2}>
              <IconMessage2 size={24} color={COLORS.greyNeutral500} />3
            </Flex>
            <Flex gap={2}>
              <IconPaperclip size={24} color={COLORS.greyNeutral500} />3
            </Flex>
          </Flex>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
          <Flex justifyContent={"space-between"}>
            <Tag
              size="lg"
              colorScheme="red"
              borderRadius="full"
              width={"fit-content"}
            >
              <TagLabel>Planning</TagLabel>
            </Tag>
            <Flex>
              <DeleteButton mr={2} />
              <ShowButton />
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
