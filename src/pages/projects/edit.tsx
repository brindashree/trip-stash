import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { DateField, Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  Flex,
  Switch,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { PROJECT_STATUS } from "../../utility/constants";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  const projectsData = queryResult?.data?.data;

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>Name</FormLabel>
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
      <FormControl mb="3" isInvalid={!!(errors as any)?.image_link}>
        <FormLabel>Project Image link</FormLabel>
        <Input type="text" {...register("image_link", {})} />
        <FormErrorMessage>
          {(errors as any)?.image_link?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.destination}>
        <FormLabel>Destination</FormLabel>
        <Input
          type="text"
          {...register("destination", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.destination?.message as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.description}>
        <FormLabel>Description</FormLabel>
        <Textarea
          size="sm"
          {...register("description", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.description?.message as string}
        </FormErrorMessage>
      </FormControl>
      <Flex gap={4}>
        <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
          <FormLabel>Status</FormLabel>
          <Select
            id="status"
            defaultValue={projectsData?.status}
            {...register("status", {
              required: "This field is required",
            })}
          >
            <option
              value={PROJECT_STATUS.PLANNING}
              key={PROJECT_STATUS.PLANNING}
            >
              {PROJECT_STATUS.PLANNING}
            </option>
            <option
              value={PROJECT_STATUS.COMPLETED}
              key={PROJECT_STATUS.COMPLETED}
            >
              {PROJECT_STATUS.COMPLETED}
            </option>
          </Select>
          <FormErrorMessage>
            {(errors as any)?.status?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb="3" isInvalid={!!(errors as any)?.private}>
          <FormLabel>Private</FormLabel>
          <Switch
            id="private"
            {...register("private", {})}
            defaultValue={projectsData?.private}
          />
          <FormErrorMessage>
            {(errors as any)?.private?.message as string}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex gap={4}>
        <FormControl mb="3" isInvalid={!!(errors as any)?.start_date}>
          <FormLabel>Start Date</FormLabel>
          <DateField value={projectsData?.start_date} format="DD-MMM-YYYY" />
          <FormErrorMessage>
            {(errors as any)?.start_date?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb="3" isInvalid={!!(errors as any)?.end_date}>
          <FormLabel>End Date</FormLabel>
          <DateField value={projectsData?.end_date} format="DD-MMM-YYYY" />
          <FormErrorMessage>
            {(errors as any)?.end_date?.message as string}
          </FormErrorMessage>
        </FormControl>
      </Flex>
     
    </Edit>
  );
};
