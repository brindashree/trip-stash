import React from "react";
import {
  IResourceComponentsProps,
  useParsed,
  HttpError,
  useTable,
  useUpdate,
  useGetIdentity,
} from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import {
  List,
  DateField,
  EditButton,
  DeleteButton,
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
} from "@chakra-ui/react";
import { ITINERARY_STATUS } from "../../utility/constants";
import { COLORS } from "../../utility/colors";
import { IItinerary, IUser } from "../../utility/interface";
import { IconHeart } from "@tabler/icons";

export const ItineraryList: React.FC<IResourceComponentsProps> = () => {
  const { mutate } = useUpdate<HttpError>();
  const { params } = useParsed();
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IUser>();
  const { tableQueryResult, setFilters } = useTable<HttpError>({
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
  const projectItineraries = tableQueryResult?.data?.data ?? [];

  const handleLikes = (data: any) => {
    const votes = data.votes;
    if (votes?.includes(user?.id)) {
      const index = votes.indexOf(user?.id);
      if (index > -1) {
        votes.splice(index, 1);
      }
    } else {
      votes.push(user?.id);
    }

    mutate({
      resource: "itineraries",
      values: {
        votes: votes,
      },
      id: data.id,
    });
  };

  return (
    <List>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab
            onClick={() => {
              setFilters([]);
              navigate(`/${params?.projectId}/itinerary`);
            }}
          >
            All Items
          </Tab>
          <Tab
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
            list={projectItineraries}
            handleLikes={handleLikes}
            userId={user?.id}
          />
          <ItineraryTabPanel
            list={projectItineraries}
            handleLikes={handleLikes}
            userId={user?.id}
          />
          <ItineraryTabPanel
            list={projectItineraries}
            handleLikes={handleLikes}
            userId={user?.id}
          />
        </TabPanels>
      </Tabs>
    </List>
  );
};

const ItineraryTabPanel = ({
  list,
  handleLikes,
  userId,
}: {
  list: any;
  handleLikes: (data: any) => void;
  userId?: any;
}) => {
  return (
    <TabPanel>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
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
                  <DateField value={row.date} format="DD-MMM-YYYY" />
                </Td>
                <Td>
                  <Text as="b">{row.title}</Text>
                </Td>
                <Td>
                  <Text color={COLORS.greyNeutral500}>{row.location}</Text>
                </Td>
                <Td>
                  <Text>{row.type_of_activity}</Text>
                </Td>
                <Td>
                  <Flex
                    cursor={"pointer"}
                    onClick={() => handleLikes(row)}
                    gap={2}
                  >
                    <IconHeart
                      color={row?.votes?.includes(userId) ? "red" : "black"}
                    />
                    <Text>{row.votes.length}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Select placeholder="Select option" defaultValue={row.status}>
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
                <Td>
                  <Flex gap={2}>
                    <EditButton recordItemId={row.id} hideText />
                    <DeleteButton recordItemId={row.id} hideText />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
};
