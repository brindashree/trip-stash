import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useGetIdentity, useNavigation } from "@refinedev/core";
import { IUser } from "../../utility/interface";
import { IconPlus } from "@tabler/icons";
import { COLORS } from "../../utility/colors";

export function Home() {
  const { push } = useNavigation();
  const { data: user } = useGetIdentity<IUser>();
  return (
    <div>
      <div>
        <Heading as="h2" size="xl" mb="4">
          Welcome back, {user?.email}
        </Heading>
        <Flex gap="4">
          <Card>
            <CardHeader>
              <Text>Your active projects</Text>
            </CardHeader>
            <CardBody>
              <Heading as="h1" size="2xl">
                1
              </Heading>
            </CardBody>
          </Card>

          <Card
            backgroundColor={COLORS.primaryColor}
            color={"white"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={4}
            flexWrap={"nowrap"}
            flexDirection={"row"}
            cursor={"pointer"}
            onClick={() => push("/projects/create")}
          >
            <IconPlus />
            Create a new project
          </Card>
        </Flex>
      </div>
      <Spacer height={100} />
      <div>
        <Heading as="h2" size="xl" mb="4">
          Your Stash
        </Heading>
        <Heading as="h4" size="xs" mb="4" color={COLORS.greyNeutral500}>
          View and manage all the projects you are a part of here
        </Heading>
      </div>
    </div>
  );
}
