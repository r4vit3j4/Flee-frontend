import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const RequestModel = ({ fetchData }) => {
  const [fullname, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [date, setDate] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [year, month, day] = date.split("-");

  const submitDetails = (e) => {
    e.preventDefault();
    console.log("sdad");
    try {
      const url = "http://172.16.221.156:3000/createPass";
      const { data } = new axios.post(url, {
        userName: fullname,
        phoneNumber: mobileNumber,
        rollNumber: rollNumber.toLowerCase(),
        purpose: purpose,
        date: day,
        month: month,
        year: year,
        outTime: timeOut,
        inTime: timeIn,
      });
    } catch (err) {
      console.log(err);
    }
    onClose();
    fetchData();
  };
  return (
    <Box>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        rightIcon={<Icon as={IconPlus} h="4" w="4" />}
      >
        New Request
      </Button>
      <form>
        <Modal
          size={["sm", "sm", "2xl"]}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontWeight="bold" fontSize="2xl" mt="10">
              Enter Your Details
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Student Name */}

              <FormControl>
                <Flex direction="column">
                  <Box mt="4">
                    <FormLabel>Name</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Full Name"
                      value={fullname}
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Box>
                  {/* Student Roll no. */}
                  <Box mt="4">
                    <FormLabel>Roll no.</FormLabel>
                    <Input
                      placeholder="Roll no."
                      value={rollNumber}
                      required
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </Box>
                  {/* Student Mobile Number */}
                  <Box mt="4">
                    <FormLabel>Mobile Number</FormLabel>
                    <Input
                      placeholder="Mobile Number"
                      value={mobileNumber}
                      required
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </Box>
                  {/* Purpose */}
                  <Box mt={4}>
                    <FormLabel>Purpose</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Purpose"
                      value={purpose}
                      required
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                  </Box>
                  {/* Date */}
                  <Box mt={4}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Date"
                      value={date}
                      type="date"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Box>
                  {/* Time Out */}
                  <Box mt={4}>
                    <FormLabel>Time Out</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Time Out"
                      value={timeOut}
                      type="time"
                      required
                      onChange={(e) => setTimeOut(e.target.value)}
                    />
                  </Box>
                  {/* Time In */}
                  <Box mt={4}>
                    <FormLabel>Time In</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Time In"
                      value={timeIn}
                      type="time"
                      required
                      onChange={(e) => setTimeIn(e.target.value)}
                    />
                  </Box>
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={(e) => submitDetails(e)}
                type="submit"
                colorScheme="green"
                mr={3}
              >
                Submit
              </Button>
              <Button onClick={onClose} colorScheme="red">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </Box>
  );
};

export default RequestModel;
