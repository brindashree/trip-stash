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
  IconButton,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import { DeleteButton, EditButton } from "@refinedev/chakra-ui";
import dayjs from "dayjs";
import { IconMapPin, IconClockHour3, IconPlus } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utility/colors";
import { getProjectStatusColor } from "../../utility";
import { IProjectCard } from "../../utility/interface";
import { useGetIdentity } from "@refinedev/core";
import InviteModal from "../invite-modal";
import PlaceHolder from "../../assets/placeholder.png";

export const ProjectCard: React.FC<IProjectCard> = (props) => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const { data: user } = useGetIdentity<IUser>();
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
      borderRadius="2xl"
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      variant="filled"
      position={"relative"}
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"
      }
      backgroundColor={COLORS.white}
      padding={2}
    >
      <Image
        objectFit="cover"
        src={image_link || PlaceHolder}
        alt="Caffe Latte"
        padding={!image_link ? 4 : "unset"}
        width={{ base: "100%", lg: "30%" }}
        borderRadius="2xl"
        border={!image_link ? `1px solid ${COLORS.greyNeutral100}` : "unset"}
      />
      <Stack width="100%">
        <CardBody>
          <Flex alignItems="center" mb={4}>
            <Text as="b" fontSize="lg">
              {title}
            </Text>
            <Tag
              background={is_private ? COLORS.warning500 : COLORS.primaryColor}
              color={"white"}
              ml={4}
            >
              <TagLabel
                textTransform={"uppercase"}
                fontSize={"xs"}
                fontWeight={"bold"}
              >
                {is_private ? "Private" : "Public"}
              </TagLabel>
            </Tag>
            <Spacer />
            {collaborators.length ? (
              <IconButton
                aria-label={""}
                icon={<IconPlus />}
                borderColor={COLORS.primaryColor}
                color={COLORS.primaryColor}
                variant={"outline"}
                backgroundColor={COLORS.white}
                mr={2}
                onClick={() => {
                  setInviteOpen(true);
                }}
              />
            ) : (
              <Button
                variant={"outline"}
                borderColor={COLORS.primaryColor}
                color={COLORS.primaryColor}
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
          </Flex>
        </CardBody>
        <CardFooter>
          <Flex justifyContent={"space-between"} width="100%">
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
              {!collaborators?.some(
                (collaborator: any) => collaborator?.id === user?.id
              ) && (
                <>
                  <EditButton
                    resourceNameOrRouteName="projects"
                    recordItemId={id}
                    mr={2}
                    hideText
                  />
                  <DeleteButton mr={2} hideText recordItemId={id} />
                </>
              )}
              <Button
                onClick={() => navigate(`/${id}/itinerary`)}
                bg={COLORS.primaryColor}
                color={COLORS.white}
              >
                View project
              </Button>
            </Flex>
          </Flex>
        </CardFooter>
      </Stack>
      <InviteModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        url={getInviteUrl()}
      />
    </Card>
  );
};
