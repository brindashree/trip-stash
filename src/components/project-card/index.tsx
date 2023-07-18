import { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Text,
  Flex,
  AvatarGroup,
  Avatar,
  Spacer,
  Tag,
  TagLabel,
  Button,
  CardHeader,
} from "@chakra-ui/react";
import { DeleteButton, ShowButton, EditButton } from "@refinedev/chakra-ui";
import dayjs from "dayjs";
import {
  IconMapPin,
  IconClockHour3,
  IconMessage2,
  IconPaperclip,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utility/colors";
import { getProjectStatusColor } from "../../utility";
import { IProject } from "../../utility/interface";
import Chat from "../chat/chat";
import InviteModal from "../invite-modal";

export const ProjectCard: React.FC<IProject> = (props) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const navigate = useNavigate();
  const {
    title,
    start_date,
    end_date,
    destination,
    description,
    id,
    status,
    user_id,
    is_private,
  } = props;

  const getInviteUrl = () => {
    return document.URL + "/invite/" + user_id + "/" + id;
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="filled"
      my={8}
      position={"relative"}
    >
      <Tag
        background={is_private ? COLORS.warning500 : COLORS.primaryColor}
        color={"white"}
        position={"absolute"}
        top={"50%"}
        right={4}
      >
        <TagLabel>{is_private ? "Private" : "Public"}</TagLabel>
      </Tag>
      <Image
        objectFit="cover"
        // maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        pt={4}
        pb={4}
        pl={4}
        htmlWidth="240px"
        borderRadius="3xl"
      />
      <CardBody>
        <Flex alignItems="center">
          <Text as="b" fontSize="lg">
            {title}
          </Text>
          <Spacer />
          <Button
            onClick={() => {
              setInviteOpen(true);
            }}
          >
            Invite
          </Button>
          <AvatarGroup size="md" max={2}>
            <Avatar name="Ryan " />
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
              {destination}
            </Flex>
            <Flex gap={2}>
              <IconClockHour3 size={24} color={COLORS.greyNeutral500} />
              {dayjs(start_date).format("Do MMM")} -{" "}
              {dayjs(end_date).format("Do MMM")}
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

          <Text py="2">{description}</Text>
          <Flex justifyContent={"space-between"}>
            <Tag
              size="lg"
              colorScheme={getProjectStatusColor(status)}
              borderRadius="full"
              width={"fit-content"}
            >
              <TagLabel>{status}</TagLabel>
            </Tag>
            <Flex>
              <Button
                background={"blue"}
                color={"white"}
                onClick={() => setChatOpen(true)}
                mr={2}
              >
                Chat
              </Button>
              <EditButton
                resourceNameOrRouteName="projects"
                recordItemId={id}
                mr={2}
              />
              <DeleteButton mr={2} recordItemId={id} />
              <ShowButton onClick={() => navigate(`/${id}/itinerary`)} />
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
      <Chat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        projectId={id}
      />
      <InviteModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        url={getInviteUrl()}
      />
    </Card>
  );
};
