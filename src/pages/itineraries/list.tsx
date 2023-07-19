import React, { useMemo, useState } from "react";
import {
  IResourceComponentsProps,
  useParsed,
  HttpError,
  useTable,
  useUpdate,
  useGetIdentity,
  useMany,
} from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import {
  List,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  Text,
  Tabs,
  Tab,
  TabPanels,
  TabList,
  TabPanel,
  Flex,
  Tag,
  Heading,
  Button,
  TagLabel,
} from "@chakra-ui/react";
import { COLORS } from "../../utility/colors";
import { IItinerary, IProject, IUser } from "../../utility/interface";
import { IconHeart, IconLocation, IconMessage2, IconPlus } from "@tabler/icons";
import { getRandomTagColor } from "../../utility";
import InviteModal from "../../components/invite-modal";
import { ITINERARY_STATUS } from "../../utility/constants";
import Chat from "../../components/chat/chat";
import dayjs from "dayjs";

export const ItineraryList: React.FC<IResourceComponentsProps> = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chats, setChats] = useState<any>([]);

  const { mutate } = useUpdate<HttpError>();
  const { params } = useParsed();
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IUser>();
  const { tableQueryResult, setFilters, filters } = useTable<
    IItinerary,
    HttpError
  >({
    filters: {
      permanent: [
        {
          field: "project_id",
          operator: "eq",
          value: Number(params?.projectId),
        },
      ],
      defaultBehavior: "replace",
    },
  });
  const [ids] = useState([params?.projectId]);

  const { data: projectData } = useMany<IProject, HttpError>({
    resource: "projects",
    ids,
  });

  const activeConfirmedTab = useMemo(() => {
    return filters
      .filter((filter: any) => filter.field === "status")
      .filter((fil: any) => fil.value === ITINERARY_STATUS.CONFIRMED);
  }, [filters]);

  const projectItineraries = tableQueryResult?.data?.data ?? [];

  const sortedProjectItineraries = projectItineraries?.sort(
    (a: IItinerary, b: IItinerary) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1.getTime() - date2.getTime();
    }
  );

  const handleLikes = (data: any) => {
    let votes = data.votes || [];
    const userVoteFound = votes?.some(
      (vote: { id: string | undefined }) => vote.id === user?.id
    );
    if (userVoteFound) {
      votes = votes.filter((vote: { id: any }) => vote.id !== user?.id);
    } else {
      votes.push({
        id: user?.id,
        email: user?.email,
      });
    }
    mutate({
      resource: "itineraries",
      values: {
        votes: votes,
      },
      id: data.id,
    });
  };
  const handleStatusChange = (data: any, updatedStatus: string) => {
    if (updatedStatus) {
      mutate({
        resource: "itineraries",
        values: {
          status: updatedStatus,
        },
        id: data.id,
      });
    }
  };
  const getInviteUrl = () => {
    return document.URL + "/invite/" + user?.id + "/" + params?.projectId;
  };
  return (
    <List
      title={<Heading size="lg">{projectData?.data?.[0]?.title}</Heading>}
      canCreate={false}
      headerButtons={() => (
        <>
          <Button
            colorScheme="pink"
            leftIcon={<IconPlus />}
            variant={"outline"}
            onClick={() => {
              setInviteOpen(true);
            }}
          >
            Invite
          </Button>
          <Button
            bg={COLORS.primaryColor}
            leftIcon={<IconPlus />}
            onClick={() => navigate(`/${params?.projectId}/itinerary/create`)}
          >
            Add itinerary item
          </Button>
          {activeConfirmedTab.length > 0 && (
            <Button
              leftIcon={<IconLocation />}
              colorScheme="pink"
              variant={"outline"}
              onClick={() => navigate(`/final-plan/${params?.projectId}`)}
            >
              View Final Plan
            </Button>
          )}
        </>
      )}
    >
      <Tabs variant="soft-rounded" mt={8} colorScheme="pink" minHeight={"80vh"}>
        <TabList>
          <Tab
            color={COLORS.primaryColor}
            onClick={() => {
              setFilters([]);
              navigate(`/${params?.projectId}/itinerary`);
            }}
          >
            All Items
          </Tab>
          <Tab
            color={COLORS.primaryColor}
            onClick={() =>
              setFilters([
                {
                  field: "status",
                  operator: "eq",
                  value: ITINERARY_STATUS.CONFIRMED,
                },
              ])
            }
          >
            Confirmed
          </Tab>
          <Tab
            color={COLORS.primaryColor}
            onClick={() =>
              setFilters([
                {
                  field: "status",
                  operator: "eq",
                  value: ITINERARY_STATUS.CANCELED,
                },
              ])
            }
          >
            Canceled
          </Tab>
        </TabList>

        <TabPanels>
          <ItineraryTabPanel
            list={sortedProjectItineraries}
            handleLikes={handleLikes}
            handleStatusChange={handleStatusChange}
            userId={user?.id}
          />
          <ItineraryTabPanel
            list={sortedProjectItineraries}
            handleLikes={handleLikes}
            handleStatusChange={handleStatusChange}
            userId={user?.id}
          />
          <ItineraryTabPanel
            list={sortedProjectItineraries}
            handleLikes={handleLikes}
            handleStatusChange={handleStatusChange}
            userId={user?.id}
          />
        </TabPanels>
      </Tabs>
      <InviteModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        url={getInviteUrl()}
      />

      <Chat
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        projectId={params?.projectId}
        chats={chats}
        setChats={setChats}
      />

      <Tag
        color={COLORS.white}
        background={COLORS.primaryColor}
        position={"fixed"}
        bottom={8}
        right={8}
        cursor={"pointer"}
        fontSize={"lg"}
        borderRadius={"xl"}
        onClick={() => setChatOpen(true)}
        padding={4}
      >
        <IconMessage2 />
        <TagLabel ml={2}>Chat {chats?.length ? chats?.length : null}</TagLabel>
      </Tag>
    </List>
  );
};

const ItineraryTabPanel = ({
  list,
  handleLikes,
  handleStatusChange,
  userId,
}: {
  list: any;
  handleLikes: (data: any) => void;
  handleStatusChange: (data: any, status: string) => void;
  userId?: any;
}) => {
  return (
    <TabPanel padding={"unset"} pt={4}>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead bg={COLORS.lightGrey}>
            <Tr>
              <Th>Date</Th>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Type</Th>
              <Th>Votes</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((row: IItinerary) => (
              <Tr key={row.id}>
                <Td>
                  <Text fontSize={"sm"}>{dayjs(row.date).format("DD-MMM-YYYY")} </Text>
                </Td>
                <Td>
                  <Text as="b">{row.title}</Text>
                </Td>
                <Td>
                  <Text color={COLORS.greyNeutral500}>{row.location}</Text>
                </Td>
                <Td>
                  <Tag colorScheme={getRandomTagColor()} borderRadius={"full"}>
                    {row.type_of_activity}
                  </Tag>
                </Td>
                <Td>
                  <Flex
                    cursor={"pointer"}
                    onClick={() => handleLikes(row)}
                    gap={2}
                  >
                    <IconHeart
                      color={
                        row?.votes?.some((vote: any) => vote?.id === userId)
                          ? "red"
                          : "black"
                      }
                    />
                    <Text>{row.votes?.length}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Select
                    placeholder="Select option"
                    defaultValue={row.status}
                    disabled={userId !== row.added_by.id}
                    onChange={(e) => handleStatusChange(row, e.target.value)}
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
                </Td>
                {userId === row.added_by.id ? (
                  <Td>
                    <Flex gap={2}>
                      <EditButton recordItemId={row.id} hideText />
                      <DeleteButton recordItemId={row.id} hideText />
                    </Flex>
                  </Td>
                ) : (
                  <Td>
                    <ShowButton recordItemId={row.id} hideText />
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
};
