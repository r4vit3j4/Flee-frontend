import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestModel from "../components/RequestModel";
import { themeConstants } from "../theme/theme";

const AppPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [prevData, setPrevData] = useState([]);

  const fetchData = async () => {
    const url = `${import.meta.env.VITE_API_URL}/getPrevPass?id=${
      user.rollNumber
    }`;

    const { data: res } = await axios.get(url);
    setPrevData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex w="full" justify="center">
      <Flex direction="column" w="full" maxW="7xl" gap="10" mt="10">
        <Flex w="full" justify={["center", "center", "flex-end"]}>
          <Heading as="h2">
            Welcome{" "}
            <Text
              as="span"
              bg="linear-gradient(230deg,#a24bcf,#4b79cf,#4bc5cf)"
              backgroundClip="text"
            >
              {user.fullName}
            </Text>
          </Heading>
        </Flex>
        <Flex w="full" justify="flex-start">
          <RequestModel user={user} fetchDetails={fetchData} />
        </Flex>

        <Heading as="h2" mt="5">
          Previous Outpasses
        </Heading>
        <Box
          w="full"
          p="10"
          border={`1px solid ${
            colorMode === "light"
              ? themeConstants.borderLight
              : themeConstants.borderDark
          }`}
          borderRadius="lg"
        >
          <TableContainer>
            {loading ? (
              <Spinner />
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Purpose</Th>
                    <Th>Time Out</Th>
                    <Th>Time In</Th>
                    <Th>Approval Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {prevData.map((pass, index) => {
                    console.log(pass);
                    return (
                      <Tr key={index}>
                        <Td>
                          {pass.date}-{pass?.month}-{pass?.year}
                        </Td>
                        <Td>{pass.purpose}</Td>
                        <Td>{pass.outTime}</Td>
                        <Td>{pass.inTime}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              pass.status === "To be verified"
                                ? "orange"
                                : pass.status === "Verified"
                                ? "green"
                                : "red"
                            }
                            fontSize="15"
                          >
                            {pass.status}
                          </Badge>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            )}
          </TableContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AppPage;
