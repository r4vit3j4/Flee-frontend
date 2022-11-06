import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  IconLayoutDashboard,
  IconLogout,
  IconSun,
  IconUser,
} from "@tabler/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const toast = new useToast();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userData");
    setUser("");

    toast({
      title: "Success",
      description: "Successfully logged out",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Flex
      w="full"
      p="4"
      py="6"
      borderBottom="1px solid #e6e6e6"
      position="sticky"
      top="0"
      backdropFilter="blur(4px)"
      justify="center"
      zIndex="100"
    >
      <Flex w="full" maxW="7xl" align="center" justify="space-between" gap="2">
        <Link to="/">
          <Image
            src="/assets/logo.png"
            h="7"
            _hover={{
              opacity: "0.8",
            }}
          />
        </Link>
        <Flex align="center" gap="3">
          <Button variant="ghost">
            <Icon as={IconSun} h="5" w="5" />
          </Button>
          {user ? (
            <Menu>
              <MenuButton as={Button}>
                <Icon as={IconUser} h="5" w="5" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/outgoing");
                  }}
                >
                  <Flex align="center" gap="2" color="blue.400">
                    <Icon as={IconLayoutDashboard} h="5" w="5" />
                    <Text>Dashboard</Text>
                  </Flex>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <Flex align="center" gap="2" color="red.400">
                    <Icon as={IconLogout} h="5" w="5" />
                    <Text>Logout</Text>
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
