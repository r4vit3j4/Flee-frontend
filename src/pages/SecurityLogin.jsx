import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Hide,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Show,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { IconNumber, IconPassword } from "@tabler/icons";
import React from "react";
import { useState } from "react";

const SecurityLogin = ({ setUser }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const toast = new useToast();

  const login = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_API_URL}/login/student`;
      const { data } = await axios.post(url, {
        rollNumber: rollNumber.toLowerCase(),
        password: password,
      });

      if (data.status === 200) {
        toast({
          title: "Success",
          description: "Successfully logged in",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        console.log(data.data);
        setUser(data.data);
        localStorage.setItem("userData", JSON.stringify(data.data));
        // window.location = "/app";
      } else {
        toast({
          title: "Error",
          description: "Error Logging in",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "asdasd",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex w="full" justify="center">
      <Flex
        w="full"
        justify="center"
        align="flex-start"
        gap="5"
        maxW="7xl"
        mt="20"
      >
        <Show above="md">
          <Flex
            flex="1"
            bg="url('/assets/illustrations/windmill.webp')"
            h="full"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            borderRadius="20"
            boxShadow="sm"
          />
        </Show>

        <Flex flex="1" w="full" direction="column" p="10">
          <form onSubmit={(e) => login(e)}>
            <Flex w="full" direction="column" gap="10">
              <Heading as="h2" fontWeight="bold" fontSize="4xl">
                Login
              </Heading>
              <FormControl as={Flex} direction="column" gap="5">
                <Box>
                  <FormLabel>Roll Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      children={<Icon as={IconNumber} h="5" w="5" />}
                    />
                    <Input
                      name="rollNumber"
                      id="rollNumber"
                      type="text"
                      placeholder="2020BCS0072"
                      required
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftAddon
                      children={<Icon as={IconPassword} h="5" w="5" />}
                    />
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Box>
              </FormControl>
              <Button type="submit" variant="solid" colorScheme="blue" mt="4">
                Login
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SecurityLogin;
