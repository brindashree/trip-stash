import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  useSelect,
  useUpdate,
  useGetIdentity,
  HttpError,
} from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
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
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import {
  IconAccessible,
  IconBrandAmigo,
  IconBulb,
  IconCalendarEvent,
  IconMapPin,
  IconPaperclip,
  IconPlus,
  IconThumbUp,
  IconTrendingUp,
  IconUser,
} from "@tabler/icons";
import dayjs from "dayjs";
import { ACTIVITIES, ITINERARY_STATUS } from "../../utility/constants";
import { IUser } from "../../utility/interface";
import { COLORS } from "../../utility/colors";

export const ItineraryEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { mutate } = useUpdate<HttpError>();
  const [mediaLink, setMediaLink] = useState("");

  const { data: user } = useGetIdentity<IUser>();
  const itinerariesData = queryResult?.data?.data;
  const [date, setDate] = useState(
    dayjs(itinerariesData?.date).format("YYYY-MM-DD")
  );

  const { options: projectOptions } = useSelect({
    resource: "projects",
    defaultValue: itinerariesData?.project_id,
  });

  useEffect(() => {
    if (itinerariesData?.date)
      setDate(dayjs(itinerariesData?.date).format("YYYY-MM-DD"));
  }, [itinerariesData]);

  React.useEffect(() => {
    setValue("project_id", itinerariesData?.project_id?.id);
  }, [projectOptions]);

  const handleLikes = (data: any) => {
    const votes = data.votes || [];
    const userVoteFound = votes?.some(
      (vote: { id: string | undefined }) => vote.id === user?.id
    );
    if (!userVoteFound) {
      votes.push({
        id: user?.id,
        email: user?.email,
      });
      mutate({
        resource: "itineraries",
        values: {
          votes: votes,
        },
        id: data.id,
      });
    }
  };
  const handleAddLinks = (data: any, url: string) => {
    if (url !== "") {
      const mediaUrls = data.media_url || [];

      mediaUrls.push(url);

      mutate({
        resource: "itineraries",
        values: {
          media_url: mediaUrls,
        },
        id: data.id,
      });
    }
    setMediaLink("");
  };
  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Grid
        templateColumns="1fr 3fr"
        gap={4}
        alignItems={"center"}
        py={4}
        px={8}
      >
        <GridItem>
          <Flex gap={2}>
            <IconBrandAmigo color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Title</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <FormControl mb="2" isInvalid={!!(errors as any)?.title}>
            <Input
              type="text"
              {...register("title", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.title?.message as string}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconMapPin color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Location</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <FormControl mb="2" isInvalid={!!(errors as any)?.location}>
            <Input
              type="text"
              {...register("location", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.location?.message as string}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconAccessible color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Activity Type</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <FormControl mb="2" isInvalid={!!(errors as any)?.type_of_activity}>
            <Select
              id="type_of_activity"
              placeholder="Select activity"
              {...register("type_of_activity", {
                required: "This field is required",
              })}
            >
              {ACTIVITIES?.map((option) => (
                <option value={option.label} key={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {(errors as any)?.type_of_activity?.message as string}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <Flex gap={2}>
            <IconTrendingUp color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Votes</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <>
            {itinerariesData?.votes?.length > 0 ? (
              <Flex alignItems={"center"}>
                <AvatarGroup size="sm" max={3} mr={2}>
                  {itinerariesData?.votes.map((vote: any) => (
                    <Avatar name={vote.email} />
                  ))}
                </AvatarGroup>
                <Button
                  cursor={"pointer"}
                  variant={"outline"}
                  color={COLORS.primaryColor}
                  leftIcon={<IconThumbUp />}
                  onClick={() => handleLikes(itinerariesData)}
                >
                  Vote
                </Button>
              </Flex>
            ) : (
              <Button
                cursor={"pointer"}
                variant={"outline"}
                color={COLORS.primaryColor}
                leftIcon={<IconThumbUp />}
                onClick={() => handleLikes(itinerariesData)}
              >
                Vote
              </Button>
            )}
          </>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconUser color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Added by</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Tag size="lg" borderRadius="full">
            <Avatar
              size="xs"
              name={itinerariesData?.added_by?.email}
              ml={-1}
              mr={2}
            />
            <TagLabel>{itinerariesData?.added_by?.email}</TagLabel>
          </Tag>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconBulb color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Status</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <FormControl mb="2" isInvalid={!!(errors as any)?.status}>
            <Select
              placeholder="Select option"
              defaultValue={itinerariesData?.status}
              {...register("status", {
                required: "This field is required",
              })}
            >
              <option value={ITINERARY_STATUS.VOTING}>
                {ITINERARY_STATUS.VOTING}
              </option>
              <option value={ITINERARY_STATUS.CONFIRMED}>
                {ITINERARY_STATUS.CONFIRMED}
              </option>
              <option value={ITINERARY_STATUS.CANCELED}>
                {ITINERARY_STATUS.CANCELED}
              </option>
            </Select>
            <FormErrorMessage>
              {(errors as any)?.status?.message as string}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconCalendarEvent color={COLORS.greyNeutral500} />
            <Text color={COLORS.greyNeutral500}>Date</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Input
            type="date"
            {...register("date", {
              required: "This field is required",
            })}
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </GridItem>
      </Grid>
      <Divider my={4} />
      <Box p={8}>
        <Text as="b">Media Links</Text>
        <Flex alignItems={"center"} gap={5} my={4}>
          {itinerariesData?.media_url?.length > 0 &&
            itinerariesData?.media_url.map((url: string) => (
              <Flex alignItems={"center"}>
                <IconPaperclip size={16} color={COLORS.greyNeutral500} />
                <Link color="teal.500" href={url} target="_blank" mx={2}>
                  {url.substring(0, 30) + "..."}
                </Link>
              </Flex>
            ))}
        </Flex>
        <Flex alignItems={"center"} gap={4} mt={2}>
          <FormControl isInvalid={!!(errors as any)?.location}>
            <Input
              type="text"
              value={mediaLink}
              onChange={(e) => setMediaLink(e.target.value)}
            />
          </FormControl>

          <Button
            bg={COLORS.primaryColor}
            variant="ghost"
            color={COLORS.white}
            leftIcon={<IconPlus size={20} />}
            onClick={() => handleAddLinks(itinerariesData, mediaLink)}
          >
            Add attachments
          </Button>
        </Flex>

        <Divider my={4} />

        <FormControl mb="3" isInvalid={!!(errors as any)?.notes}>
          <FormLabel>Description</FormLabel>

          <Textarea size="sm" {...register("notes", {})} />
          <FormErrorMessage>
            {(errors as any)?.notes?.message as string}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Divider my={4} />
    </Edit>
  );
};
