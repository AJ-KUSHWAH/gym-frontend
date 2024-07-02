import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Container,
  Flex,
  Input,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import CardComponent from "../components/Card";
import { useNavigate } from "react-router-dom";
import QRCodeDisplay from "../components/QRCodeDisplay";

const Dashboard = () => {
  const navigate = useNavigate();
  const [qrData, setQrData] = useState({
    gymName: "",
    photos: [],
    ownerName: "",
    location: "",
    description: "",
  });
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
    }

    setQrData({
      gymName: userInfo.gymName,
      photos: userInfo.photos,
      ownerName: userInfo.ownerName,
      location: userInfo.location,
      description: userInfo.description,
    });
  }, [navigate]);

  return (
    <div>
      <Navbar />

      <Container height={"100vh"} width={"100wh"}>
        <Flex
          align="center"
          justifyContent={"center"}
          alignItems={"center"}
          mb={4}
        >
          <Input
            placeholder="Enter URC code"
            mr={2}
            mt={8}
            maxW={"400px"}
            position={"relative"}
            textColor={"white"}
          />
          <Button
            colorScheme="orange"
            mt={8}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
          >
            Apply
          </Button>
        </Flex>
        <Box
          position="relative"
          display={"flex"}
          justifyContent={"center"}
          border="1px solid #ddd"
          boxShadow="md"
          borderRadius="md"
          mt={"25%"}
          p={"20px"}
          background={"Highlight"}
        >
          <QRCodeDisplay
            data={qrData}
            borderBottomLeftRadius={2}
            borderTopLeftRadius={2}
          />
        </Box>
      </Container>

      <Container
        maxW={"max-content"}
        width={"100wh"}
        height={"100vh"}
        alignContent={"center"}
      >
        <Flex
          align={"center"}
          // flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          <CardComponent
            heading="1"
            text="Workouts attended in last 7 days"
            image="./download.jpeg"
          />
          <CardComponent
            heading="832"
            text="Workouts attended in previous month"
            image="./download.jpeg"
          />
          <CardComponent
            heading="103090"
            text="Wallet"
            image="./download.jpeg"
          />
        </Flex>
      </Container>
    </div>
  );
};

export default Dashboard;
