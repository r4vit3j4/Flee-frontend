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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestModel from "../components/RequestModel";

const AppPage = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const [prevData, setPrevData] = useState([]);

  console.log(user);

  const fetchData = async () => {
    const url = `http://172.16.221.156:3000/getPrevPass?id=${user.rollNumber}`;

    try {
      const { data: res } = await axios.get(url);
      setPrevData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <Flex w="full" justify="center">
      <Flex direction="column" w="full" maxW="7xl" gap="10" mt="10">
        <Flex w="full" justify={["center", "center", "flex-end"]}>
          <Heading as="h2">
            Welcome <Text as="span">{user.fullName}</Text>
          </Heading>
        </Flex>
        <Flex w="full" justify="flex-start">
          <RequestModel fetchData={fetchData} />
        </Flex>

        <Box
          w="full"
          p="10"
          mt="5"
          border="1px solid #e6e6e6"
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
                    return (
                      <Tr key={index}>
                        <Td>
                          {pass.date}-{pass?.month}-{pass?.year}
                        </Td>
                        <Td>{pass.purpose}</Td>
                        <Td>{pass.outTime}</Td>
                        <Td>{pass.inTime}</Td>
                        <Td>
                          <Badge colorScheme="blue" fontSize="15">
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
