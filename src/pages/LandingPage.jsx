import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Flex w="full" justify="center" mt="20">
      <Flex
        direction="column"
        gap="5"
        align="center"
        textAlign="center"
        w="full"
        maxW="7xl"
      >
        <Heading as="h1" fontWeight="extrabold" fontSize="5xl">
          <Text
            as="span"
            bg="linear-gradient(230deg,#a24bcf,#4b79cf,#4bc5cf)"
            backgroundClip="text"
          >
            Outpass
          </Text>{" "}
          management made simpler
        </Heading>
        <Text>IIIT Kottayam Flee Portal</Text>
        <Button
          rightIcon={<Icon as={IconArrowRight} h="5" w="5" />}
          colorScheme="blue"
          mt="5"
          onClick={() => navigate("/app")}
        >
          Lets Flee
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
