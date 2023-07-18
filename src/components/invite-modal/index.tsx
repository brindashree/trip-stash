import { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons";

function InviteModal({
  isOpen,
  onClose,
  url,
}: {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const textAreaRef = useRef<any>(null);

  const onCopy = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    setCopied(true);
  };

  const onWhatsappShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${url}`, "_blank");
  };

  const onFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  const onInstagramShare = () => {
    window.open(`https://www.instagram.com/?url=${url}`, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>Invite link</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" alignItems={"center"} maxH={"60vh"} gap={"4"}>
          <Textarea
            ref={textAreaRef}
            value={url}
            size="sm"
            resize="none"
            h={"100%"}
            rows={4}
            borderRadius={"md"}
          />
          <Button onClick={onCopy} colorScheme="blue">
            {copied ? "Copied" : "Copy"}
          </Button>
        </ModalBody>

        <ModalFooter justifyContent={"space-between"} gap={"4"}>
          <Heading size="sm">Share on</Heading>
          <Flex gap={"4"} cursor={"pointer"}>
            <IconBrandWhatsapp onClick={onWhatsappShare} />
            <IconBrandFacebook onClick={onFacebookShare} />
            <IconBrandInstagram onClick={onInstagramShare} />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InviteModal;
