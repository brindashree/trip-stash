import React from "react";
import {
  HttpError,
  IResourceComponentsProps,
  useGetIdentity,
  useShow,
  useUpdate,
} from "@refinedev/core";
import { Show } from "@refinedev/chakra-ui";
import {
  Flex,
  Text,
  Avatar,
  AvatarGroup,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  Divider,
  Link,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import {
  IconAccessible,
  IconBrandAmigo,
  IconBulb,
  IconCalendarEvent,
  IconMapPin,
  IconPaperclip,
  IconThumbDown,
  IconThumbUp,
  IconTrendingUp,
  IconUser,
} from "@tabler/icons";
import dayjs from "dayjs";
import { IUser } from "../../utility/interface";

export const ItineraryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const { mutate } = useUpdate<HttpError>();

  const { data: user } = useGetIdentity<IUser>();
  const handleLikes = (data: any) => {
    let votes = data.votes || [];
    const userVoteFound = votes?.some(
      (vote: { id: String | undefined }) => vote.id === user?.id
    );
    if (!userVoteFound) {
      votes.push({
        id: user?.id,
        email: user?.email,
      });
    }
    mutate({
      resource: "itineraries",
      values: {
        votes: votes,
      },
      id: data.id,
    });
  };
  return (
    <Show
      isLoading={isLoading}
      canDelete={false}
      canEdit={false}
      title={
        <Heading size="lg" textAlign={"center"}>
          Itinerary details
        </Heading>
      }
    >
      <Grid templateColumns="1fr 3fr" gap={4} alignItems={"center"} mt={8}>
        <GridItem>
          <Flex gap={2}>
            <IconBrandAmigo />
            <Text>Title</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>{record?.title}</Text>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconMapPin />
            <Text>Location</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>{record?.location}</Text>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconAccessible />
            <Text>Activity Type</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>{record?.type_of_activity}</Text>
        </GridItem>

        <GridItem>
          <Flex gap={2}>
            <IconTrendingUp />
            <Text>Votes</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <>
            {record?.votes?.length > 0 ? (
              <Flex alignItems={"center"}>
                <AvatarGroup size="sm" max={3} mr={2}>
                  {record?.votes.map((vote: any) => (
                    <Avatar name={vote.email} />
                  ))}
                </AvatarGroup>

                <Button
                  variant={"outline"}
                  colorScheme={"teal"}
                  cursor={"pointer"}
                  leftIcon={<IconThumbUp />}
                  onClick={() => handleLikes(record)}
                >
                  Vote
                </Button>
              </Flex>
            ) : (
              <Button
                variant={"outline"}
                colorScheme={"teal"}
                leftIcon={<IconThumbUp />}
                onClick={() => handleLikes(record)}
              >
                Vote
              </Button>
            )}
          </>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconUser />
            <Text>Added by</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Tag size="lg" borderRadius="full">
            <Avatar size="xs" name={record?.added_by?.email} ml={-1} mr={2} />
            <TagLabel>{record?.added_by?.email}</TagLabel>
          </Tag>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconBulb />
            <Text>Status</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>{record?.status}</Text>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconCalendarEvent />
            <Text>Date</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>{dayjs(record?.date).format("MMMM DD, YYYY")}</Text>
        </GridItem>
      </Grid>
      <Divider my={4} />

      <Text as="b">Media Links</Text>
      <Flex alignItems={"center"} gap={5} my={4}>
        {record?.media_url?.length > 0 &&
          record?.media_url.map((url: string, i: any) => (
            <Flex alignItems={"center"} key={i}>
              <IconPaperclip size={16} />
              <Link color="teal.500" href={url} target="_blank" mx={2}>
                {url}
              </Link>
            </Flex>
          ))}
      </Flex>

      <Divider my={4} />
      <Text as="b">Description</Text>
      <Text my={4}>{record?.notes}</Text>
      <Divider my={4} />
    </Show>
  );
};
