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
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </Flex>

        <Flex>
          <Flex>
            <IconMapPin size={24} color={COLORS.greyNeutral500} />
            Bangalore
          </Flex>
          <Flex>
            <IconClockHour3 size={24} color={COLORS.greyNeutral500} />
            19th Feb - 23rd Feb'23
          </Flex>
        </Flex>

        <Flex>
          <Flex>
            <IconMessage2 size={24} color={COLORS.greyNeutral500} />3
          </Flex>
          <Flex>
            <IconPaperclip size={24} color={COLORS.greyNeutral500} />3
          </Flex>
        </Flex>

        <Text py="2">
          Caffè latte is a coffee beverage of Italian origin made with espresso
          and steamed milk.
        </Text>
        <Tag size="lg" colorScheme="red" borderRadius="full">
          <TagLabel>Planning</TagLabel>
        </Tag>
      </CardBody>
    </Card>
  );
};
