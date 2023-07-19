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
  Heading,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { DeleteButton, EditButton } from "@refinedev/chakra-ui";
import dayjs from "dayjs";
import {
  IconMapPin,
  IconClockHour3,
  IconMessage2,
  IconPaperclip,
  IconPlus,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utility/colors";
import { getProjectStatusColor } from "../../utility";
import { IProject } from "../../utility/interface";
import InviteModal from "../invite-modal";
import PlaceHolder from "../../assets/placeholder.png";

export const ProjectCard: React.FC<IProject> = (props) => {
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
    collaborators,
    image_link,
  } = props;
  const getInviteUrl = () => {
    return document.URL + "/invite/" + user_id + "/" + id;
  };

  return (
    <Card
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      variant="filled"
      position={"relative"}
      backgroundColor={COLORS.white}
      padding={2}
    >
      <Image
        objectFit="cover"
        src={image_link || PlaceHolder}
        alt="Caffe Latte"
        pt={4}
        pb={4}
        pl={4}
        width={{ base: "100%", lg: "30%" }}
        borderRadius="3xl"
        border={`1px solid ${COLORS.greyNeutral100}`}
      />
      <CardBody>
        <Tag
          background={is_private ? COLORS.warning500 : COLORS.primaryColor}
          color={"white"}
        >
          <TagLabel
            textTransform={"uppercase"}
            fontSize={"xs"}
            fontWeight={"bold"}
          >
            {is_private ? "Private" : "Public"}
          </TagLabel>
        </Tag>
        <Flex alignItems="center">
          <Text as="b" fontSize="lg">
            {title}
          </Text>
          <Spacer />
          {collaborators.length ? (
            <IconButton
              aria-label={""}
              icon={<IconPlus />}
              colorScheme="teal"
              mr={2}
              onClick={() => {
                setInviteOpen(true);
              }}
            />
          ) : (
            <Button
              variant={"outline"}
              colorScheme="teal"
              leftIcon={<IconPlus />}
              onClick={() => {
                setInviteOpen(true);
              }}
            >
              Invite
            </Button>
          )}

          <AvatarGroup size="md" max={2}>
            {collaborators?.map((user: any) => {
              return <Avatar key={user?.id} name={user?.email} />;
            })}
          </AvatarGroup>
        </Flex>
        <Flex gap={4} flexDirection={"column"}>
          <Flex gap={4}>
            <Flex gap={2}>
              <IconMapPin size={24} color={COLORS.greyNeutral500} />
              {destination}
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <IconClockHour3 size={24} color={COLORS.greyNeutral500} />
              {dayjs(start_date).format("DD MMM'YY")}{" "}
              <Heading as="span" size="sm">
                -{"  "}
              </Heading>
              {dayjs(end_date).format("DD MMM'YY")}
            </Flex>
          </Flex>

          <Text py="2">{description}</Text>
          <Flex justifyContent={"space-between"}>
            <Tag
              size="lg"
              colorScheme={getProjectStatusColor(status)}
              width={"fit-content"}
              mr={2}
              borderRadius={"full"}
            >
              <TagLabel>{status}</TagLabel>
            </Tag>
            <Flex>
              <EditButton
                resourceNameOrRouteName="projects"
                recordItemId={id}
                mr={2}
                hideText
              />
              <DeleteButton mr={2} hideText recordItemId={id} />
              <Button
                onClick={() => navigate(`/${id}/itinerary`)}
              >
                View project
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>

      <InviteModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        url={getInviteUrl()}
      />
    </Card>
  );
};
