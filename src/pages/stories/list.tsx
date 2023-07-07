import { Button, useDisclosure } from "@chakra-ui/react";
import { AddItem } from "../../components/forms/add-item";
// only to test ui 
export const StoryList: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
       <Button onClick={onOpen}>Add itinerary item</Button>
       <AddItem isOpen={isOpen} onClose={onClose} />
      </>
    );
  };