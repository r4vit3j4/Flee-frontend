import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OutgoingPage = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = yyyy + "-" + mm + "-" + dd;
  const [date, setDate] = useState(formattedToday);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (param = "") => {
    console.log("fetching");
    setLoading(true);
    let url;
    if (param !== "initial") {
      let [year, month, day] = date.split("-");

      console.log(year, month, day);
      url = `https://fleepass.herokuapp.com/getStudents?date=${day}&month=${month}&year=${year}`;
    } else {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = yyyy + "-" + mm + "-" + dd;
      console.log(formattedToday);
      url = `https://fleepass.herokuapp.com/getStudents?date=${dd}&month=${mm}&year=${yyyy}`;
    }
    try {
      const { data } = await axios.get(url);
      console.log(data.data);
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const verify = async (rollNumber, day, month, year, type) => {
    const url = `https://fleepass.herokuapp.com/verify?id=${rollNumber}&date=${day}&type=${type}&month=${month}&year=${year}`;
    console.log(url);
    try {
      const { data } = await axios.get(url);
      fetchDetails();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails("initial");
  }, []);

  return (
    <Flex w="full" justify="center">
      <Flex direction="column" w="full" justify="center" maxW="7xl" mt="10">
        <Flex w="full" gap="3">
          <Input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <Button onClick={fetchDetails}>Search</Button>
        </Flex>
        {data.length > 0 && (
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
                      <Th>Name</Th>
                      <Th>Roll Number</Th>
                      <Th>Purpose</Th>
                      <Th>Time Out</Th>
                      <Th>Time In</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((pass, index) => {
                      console.log(pass);
                      return (
                        <Tr key={index}>
                          <Td>
                            {pass.date} - {pass?.month} - {pass?.year}
                          </Td>
                          <Td>{pass.userName}</Td>
                          <Td>{pass.rollNumber}</Td>
                          <Td>{pass.purpose}</Td>
                          <Td>{pass.outTime}</Td>
                          <Td>{pass.inTime}</Td>
                          <Td>
                            <Flex gap="2">
                              {pass.outVerified ? (
                                <Button disabled colorScheme="green">
                                  Approved
                                </Button>
                              ) : (
                                <Button
                                  colorScheme="blue"
                                  onClick={() =>
                                    verify(
                                      pass.rollNumber,
                                      pass.date,
                                      pass.month,
                                      pass.year,
                                      "out"
                                    )
                                  }
                                >
                                  Out
                                </Button>
                              )}
                              {pass.inVerified ? (
                                <Button disabled colorScheme="green">
                                  Entered
                                </Button>
                              ) : (
                                <Button
                                  colorScheme="blue"
                                  onClick={() =>
                                    verify(
                                      pass.rollNumber,
                                      pass.date,
                                      pass.month,
                                      pass.year,
                                      "in"
                                    )
                                  }
                                >
                                  In
                                </Button>
                              )}
                            </Flex>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              )}
            </TableContainer>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default OutgoingPage;
