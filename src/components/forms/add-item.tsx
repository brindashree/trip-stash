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
} from "@chakra-ui/react";

export const AddItem = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl" marginBottom={-4}>
          Add Item
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text marginBottom={8}> Add your itinerary here</Text>

          <Flex gap={4} marginBottom={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Ex: Adam" />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="date" />
            </FormControl>
          </Flex>

          <FormControl marginBottom={4}>
            <FormLabel>Location</FormLabel>
            <Input type="text" />
            <FormHelperText>Caption goes here</FormHelperText>
          </FormControl>

          <FormControl marginBottom={4}>
            <FormLabel>Media URL</FormLabel>
            <Input type="text" />
          </FormControl>

          <Flex gap={4} marginBottom={4}>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input type="text" />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Here is a sample placeholder" size="sm" />
          </FormControl>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button variant="ghost">Cancel</Button>
          <Button colorScheme="blue" onClick={onClose}>
            Add Item
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
