import {
  HttpError,
  IResourceComponentsProps,
  useMany,
  useParsed,
  useSelect,
} from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Heading,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { ACTIVITIES, ITINERARY_STATUS } from "../../utility/constants";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../utility/interface";
import { useState } from "react";
import dayjs from "dayjs";

export const ItineraryCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { formLoading, onFinish },
    saveButtonProps,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { params } = useParsed();
  const [ids] = useState([params?.projectId]);
  const { data, isLoading, isError } = useMany<IProject, HttpError>({
    resource: "projects",
    ids,
  });
  const itineraryMinStartDate = dayjs(data?.data?.[0]?.start_date).format('YYYY-MM-DD');
  const itineraryMaxStartDate = dayjs(data?.data?.[0]?.end_date).format('YYYY-MM-DD')

  const handleSubmitItineraryCreate = (values: any) => {
    onFinish({
      ...values,
      project_id: params?.projectId,
      status: ITINERARY_STATUS.VOTING,
    }).then(() => navigate(`/${params?.projectId}/itinerary`));
  };

  return (
    <Create
      isLoading={isLoading || formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(handleSubmitItineraryCreate),
      }}
      title={<Heading size="lg"> Add itinerary</Heading>}
    >
      <Flex gap={4}>
        <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
          <FormLabel>Title</FormLabel>
          <Input
            id="title"
            type="text"
            {...register("title", {
              required: "This field is required",
            })}
          />
          <FormErrorMessage>
            {(errors as any)?.title?.message as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="3" isInvalid={!!(errors as any)?.date}>
          <FormLabel>Date</FormLabel>
          <Input
            id="date"
            type="date"
            min={itineraryMinStartDate}
            max={itineraryMaxStartDate}
            {...register("date", {
              required: "This field is required",
            })}
          />
        </FormControl>
        <FormErrorMessage>
          {(errors as any)?.date?.message as string}
        </FormErrorMessage>
      </Flex>

      <FormControl mb="3" isInvalid={!!(errors as any)?.location}>
        <FormLabel>Location</FormLabel>
        <Input
          id="location"
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
        <FormLabel>Type of Activity</FormLabel>
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

      <FormControl mb="3" isInvalid={!!(errors as any)?.notes}>
        <FormLabel>Notes</FormLabel>
        <Textarea id="notes" size="sm" {...register("notes", {})} />
        <FormErrorMessage>{`${errors.notes?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
