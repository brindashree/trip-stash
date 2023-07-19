import React from "react";
import HeroImage from "../../assets/hero.png";
import RightImage from "../../assets/right.png";
import LeftImage from "../../assets/left.png";
import { Image, Text, Flex, Spacer, Heading, Button } from "@chakra-ui/react";
import { useNavigation } from "@refinedev/core";
import { useIsAuthenticated } from "@refinedev/core";

export function Landing() {
  const { push } = useNavigation();
  const { data } = useIsAuthenticated();

  const handleRouteToLogin = () => {
    if (data?.authenticated) {
      push("/home");
      return;
    }

    push("/login");
  };

  return (
    <div style={{ padding: " 8px", width: "80%", margin: "0 auto" }}>
      <Spacer h="48px" />
      <Flex direction="column" alignItems={"center"}>
        <Heading textAlign={"center"} as="h1" size="xl" mb="4">
          Collaborative Travel Made Easy
        </Heading>
        <Text textAlign={"center"}>
          Turn your collective travel inspirations into unforgettable journey
          with TripStash. Plan Together, Experience Together.
        </Text>
        <Button
          margin={"auto"}
          mt="8"
          colorScheme="blue"
          variant="solid"
          size="md"
          onClick={handleRouteToLogin}
        >
          {data?.authenticated ? "Go to home" : "Join us now"}
        </Button>
        <Image
          src={HeroImage}
          alt="Hero Image"
          width="100%"
          height="auto"
          mt="8"
        />
      </Flex>

      <Flex
        direction={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
        alignItems={"center"}
        mt={16}
        gap={"16%"}
      >
        <div>
          <Heading as="h3" size="xl" mb="4" mt="12">
            Collaborative Itinerary
          </Heading>
          <Text>
            Make group travel planning a breeze. Create projects and invite
            friends or family to collaboratively add, vote on, and finalize
            itinerary items. Share ideas, keep track of bookings, and create
            your perfect journey together with TripStash.
          </Text>
        </div>
        <Image
          src={RightImage}
          alt="Hero Image"
          width="100%"
          height="auto"
          mt="8"
        />
      </Flex>

      <Flex
        direction={["column", "column", "column", "row"]}
        alignItems={"center"}
        mt={16}
        gap={"16%"}
      >
        <Image src={LeftImage} alt="Hero Image" width="100%" height="auto" />
        <div>
          <Heading as="h3" size="xl" mb="4" mt="12">
            Multimedia Inspiration
          </Heading>
          <Text>
            Travel planning starts with inspiration. With TripStash, you can
            collect and organize all the images, videos, and articles that
            inspire your wanderlust. Share your sources of inspiration within
            your group and use them as a starting point for your itinerary. Turn
            the dream into reality with a click.
          </Text>
        </div>
      </Flex>
    </div>
  );
}
