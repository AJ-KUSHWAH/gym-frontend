import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <>
      {/* useColorModeValue('gray.100', 'gray.900') */}
      <Box bg="#686D76" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link
                px={2}
                py={1}
                rounded={"md"}
                textColor={"white"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("orange", "orange"),
                }}
                href={"/dashboard"}
                fontSize={"large"}
              >
                Dashboard
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                textColor={"white"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("orange", "orange"),
                }}
                href={"/profile"}
                fontSize={"large"}
              >
                Profile
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              colorScheme="orange"
              onClick={() => {
                logoutHandler();
              }}
            >
              Logout
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  // bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={"/dashboard"}
              >
                Dashboard
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  // bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={"/profile"}
              >
                Profile
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
