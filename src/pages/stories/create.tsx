import { Create } from "@refinedev/chakra-ui";
import {
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createStory } from "../../api/story";

export const StoryCreate: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  useEffect(()=>{
    createStory();
  },[])
  return (
    <Create title={<Heading size="lg">Create your new story!</Heading>}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.destinations}>
        <FormLabel>Destinations</FormLabel>
        <Select
          id="destinations"
          placeholder="Select Destinations"
          {...register("destinations", {
            required: "Destinations is required",
          })}
        >
          <option>Destination 1</option>
          <option>Destination 2</option>
          <option>Destination 3</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.activities}>
        <FormLabel>Activities</FormLabel>
        <Select
          id="activities"
          placeholder="Select Activities"
          {...register("activities", {})}
        >
          <option>Activity 1</option>
          <option>Activity 2</option>
          <option>Activity 3</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.collaborators}>
        <FormLabel>Collaborators</FormLabel>
        <Input
          id="collaborator"
          type="text"
          {...register("collaborator", {})}
        />
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.hastags}>
        <FormLabel>Hashtags</FormLabel>
        <Input
          id="hashtags"
          type="text"
          {...register("hashtags", {})}
        />
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
