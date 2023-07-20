import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Heading,
  Card,
  CardBody,
  Tag,
  TagLabel,
  Divider,
} from "@chakra-ui/react";
import { useList } from "@refinedev/core";
import { COLORS } from "../../utility/colors";
import { IconPlane } from "@tabler/icons";

function PublicProjectModal({
  projectId,
  isOpen,
  onClose,
}: {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { data: projectDetails } = useList({
    resource: "projects",
    filters: [
      {
        field: "id",
        operator: "eq",
        value: projectId,
      },
    ],
  });

  const { data: itineraries } = useList({
    resource: "itineraries",
    filters: [
      {
        field: "project_id",
        operator: "eq",
        value: projectId,
      },
    ],
    pagination: {
      mode: "off",
    },
  });

  return (
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>Project View</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH={"80vh"} overflowY={"auto"}>
          <Heading as="h1" size="lg" mb={2}>
            {projectDetails?.data?.[0]?.title}
          </Heading>
          <Text fontSize="sm" mb="4" as="b" color={COLORS.greyNeutral500}>
            {projectDetails?.data?.[0]?.description}
          </Text>

          <Flex mt={8} alignItems={"center"} gap={2}>
            <Heading as="h3" size="md">
              {projectDetails?.data?.[0]?.destination}
            </Heading>
            <IconPlane color={COLORS.primaryColor} />
          </Flex>

          <Flex direction={"column"} mt={8} gap={4}>
            <Flex alignItems={"center"} gap={4}>
              <Heading as="h3" size="md">
                Iteneararies
              </Heading>
              <Divider orientation="horizontal" />
            </Flex>

            <Flex direction={"column"}>
              {itineraries?.data?.map((itinerary: any) => (
                <ItinerariesCard
                  key={itinerary.id}
                  title={itinerary.title}
                  status={itinerary.status}
                  type_of_activity={itinerary.type_of_activity}
                  location={itinerary.location}
                />
              ))}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const ItinerariesCard = ({
  title,
  status,
  type_of_activity,
  location,
}: {
  title: string;
  status: string;
  type_of_activity: string;
  location: string;
}) => {
  return (
    <Card>
      <CardBody position={"relative"}>
        <Heading as="h6" size="lg" mb={2}>
          {title}
        </Heading>

        <Text
          display={"block"}
          fontSize="sm"
          mb="4"
          as="b"
          color={COLORS.greyNeutral500}
        >
          Activity: {type_of_activity}
        </Text>
        <Text
          display={"block"}
          fontSize="sm"
          mb="4"
          as="b"
          color={COLORS.greyNeutral500}
        >
          Location: {location}
        </Text>
        <Tag
          position={"absolute"}
          top={4}
          right={4}
          color={COLORS.white}
          background={COLORS.primaryColor}
          mt={2}
          width={"fit-content"}
        >
          <TagLabel>Status: {status}</TagLabel>
        </Tag>
      </CardBody>
    </Card>
  );
};

export default PublicProjectModal;
