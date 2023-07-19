import {
  IResourceComponentsProps,
  useGetIdentity,
  useNavigation,
} from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Flex,
  Heading,
  Switch,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { IUser } from "../../utility/interface";
import { PROJECT_STATUS } from "../../utility/constants";

export const ProjectCreate: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();
  const {
    refineCore: { formLoading, onFinish, mutationResult },
    saveButtonProps,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { list } = useNavigation();

  const handleSubmitProjectCreate = (values: any) => {
    onFinish({
      ...values,
      user_id: user?.id,
      status: PROJECT_STATUS.PLANNING,
    })
      .then(() => console.log(mutationResult, "mutatationResult"))
      .then(() => list("projects"));
  };
  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(handleSubmitProjectCreate),
      }}
      title={<Heading size="lg">Create new project</Heading>}
    >
      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          placeholder="Name your project ex. 'John's Greek Adventure'"
          {...register("title", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.title?.message as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl marginBottom={4} isInvalid={!!errors?.private}>
        <FormLabel>Private</FormLabel>
        <Switch id="private" {...register("private", {})} />
        <FormErrorMessage>{`${errors.private?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl marginBottom={4} isInvalid={!!errors?.destination}>
        <FormLabel>Destination</FormLabel>
        <Input id="destination" type="text" {...register("destination", {})} />
        <FormErrorMessage>{`${errors.destination?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl marginBottom={4}>
        <FormLabel>Description</FormLabel>
        <Textarea id="description" size="sm" {...register("description", {})} />
        <FormErrorMessage>{`${errors.description?.message}`}</FormErrorMessage>
      </FormControl>

      <Flex gap={4} marginBottom={4}>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input id="start_date" type="date" {...register("start_date", {})} />
          <FormErrorMessage>{`${errors.start_date?.message}`}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Return Date</FormLabel>
          <Input id="end_date" type="date" {...register("end_date", {})} />
          <FormErrorMessage>{`${errors.end_date?.message}`}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Create>
  );
};
