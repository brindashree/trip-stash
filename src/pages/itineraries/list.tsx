import React from "react";
import {
  IResourceComponentsProps,
  useParsed,
  HttpError,
  useTable,
} from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { List, DateField } from "@refinedev/chakra-ui";
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
} from "@chakra-ui/react";
import { ITINERARY_STATUS } from "../../utility/constants";
import { COLORS } from "../../utility/colors";
import { IItinerary } from "../../utility/interface";

export const ItineraryList: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed();
  const navigate = useNavigate();
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
          <ItineraryTabPanel list={projectItineraries} />
          <ItineraryTabPanel list={projectItineraries} />
          <ItineraryTabPanel list={projectItineraries} />
        </TabPanels>
      </Tabs>
    </List>
  );
};

const ItineraryTabPanel = ({ list }: { list: any }) => {
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
                  <Text>{row.votes}</Text>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
  );
};
