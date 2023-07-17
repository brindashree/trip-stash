import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useSelect,
} from "@refinedev/core";
import { Edit, TagField } from "@refinedev/chakra-ui";
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
  Heading,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import {
  IconBulb,
  IconCalendarEvent,
  IconPaperclip,
  IconPlus,
  IconTags,
  IconTrendingUp,
  IconUser,
} from "@tabler/icons";
import dayjs from "dayjs";
import { ITINERARY_STATUS } from "../../utility/constants";

export const ItineraryEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const itinerariesData = queryResult?.data?.data;

  const { options: projectOptions } = useSelect({
    resource: "projects",
    defaultValue: itinerariesData?.project_id,
  });

  React.useEffect(() => {
    setValue("project_id", itinerariesData?.project_id?.id);
  }, [projectOptions]);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Grid templateColumns="1fr 3fr" gap={4}>
        <GridItem>
          <Flex gap={2}>
            <IconTrendingUp />
            <Text>Votes</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <AvatarGroup size="sm" max={2}>
            <Avatar name="Ryan " />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconTags />
            <Text>Tags</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex>
            <TagField value={"Food"} mr={4} />
            <TagField value={"Activity"} />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconUser />
            <Text>Added by</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Tag size="lg" borderRadius="full">
            <Avatar
              src="https://bit.ly/sage-adebayo"
              size="xs"
              name="Segun Adebayo"
              ml={-1}
              mr={2}
            />
            <TagLabel>Segun</TagLabel>
          </Tag>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconBulb />
            <Text>Status</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>Voting</Text>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <IconCalendarEvent />
            <Text>Date</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Text>{dayjs(itinerariesData?.date).format("MMMM DD, YYYY")}</Text>
        </GridItem>
      </Grid>
      <Divider my={4} />

      <Text as="b">Media Links</Text>
      <Flex alignItems={"center"} gap={5} mt={2}>
        <IconPaperclip size={16} />
        <Flex>
          <Link color="teal.500" href="#" mx={2}>
            Document link
          </Link>
          <Link color="teal.500" href="#" mx={2}>
            Document link
          </Link>
        </Flex>
      </Flex>
      <Flex alignItems={"center"} gap={2} mt={2}>
        <IconPlus size={20} />
        <Button colorScheme="teal" variant="ghost">
          Add attachments
        </Button>
      </Flex>

      <Divider my={4} />

      <FormControl mb="3" isInvalid={!!(errors as any)?.notes}>
        <FormLabel>Description</FormLabel>

        <Textarea
          size="sm"
          {...register("notes", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.notes?.message as string}
        </FormErrorMessage>
      </FormControl>

      <Divider my={4} />

      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>Title</FormLabel>
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

      <FormControl mb="3" isInvalid={!!(errors as any)?.location}>
        <FormLabel>Location</FormLabel>
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

      <FormControl mb="3" isInvalid={!!(errors as any)?.type_of_activity}>
        <FormLabel>
          Activity Type
        </FormLabel>
        <Input
          type="text"
          {...register("type_of_activity", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.type_of_activity?.message as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.votes}>
        <FormLabel>Votes</FormLabel>
        <Input
          type="number"
          {...register("votes", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.votes?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
        <FormLabel>Status</FormLabel>
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
    </Edit>
  );
};
