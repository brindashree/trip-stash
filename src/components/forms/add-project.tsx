import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";

export const AddProject = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl" marginBottom={-4}>
          Create new project
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl marginBottom={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name your project ex. 'John's Greek Adventure'"
            />
          </FormControl>

          <FormControl marginBottom={4}>
            <FormLabel>Destination</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl marginBottom={4}>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Here is a sample placeholder" size="sm" />
          </FormControl>

          <Flex gap={4} marginBottom={4}>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Return Date</FormLabel>
              <Input type="date" />
            </FormControl>
          </Flex>
          <Checkbox size="md" colorScheme="blue">
            Invite friends to this project
          </Checkbox>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button variant="ghost">Cancel</Button>
          <Button colorScheme="blue" onClick={onClose}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
