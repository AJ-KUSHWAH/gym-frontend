import React, { useEffect } from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import "../App.css";

import SignUp from "../components/SignUp";
import Login from "../components/Login";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="home">
      <Container
        maxW="xl"
        centerContent
        bg={"ThreeDDarkShadow"}
        // backgroundImage="url('../assets/gym-bg1.jpeg')" // Replace with the path to your image
        // backgroundSize="cover"
        // backgroundPosition="center"
      >
        <Box
          d="flex"
          justifyContent="center"
          m="40px 0 15px 0"
          p={3}
          borderRadius="lg"
          borderWidth="1px"
          background={""}
          width="100%"
        >
          <Text textAlign={"center"} fontSize={"30px"} textColor={"white"}>
            FitRaga
          </Text>
        </Box>

        <Tabs
          variant="soft-rounded"
          width="100%"
          borderRadius="lg"
          borderWidth="1px"
          background={"transparent"}
          textColor={"white"}
          boxShadow={"xl"}
          border={"none"}
        >
          <TabList m="10px 0 10px 0" shadow={"white"}>
            <Tab width="50%">SignUP</Tab>
            <Tab width="50%">Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box></Box>
      </Container>
    </div>
  );
};

export default HomePage;
