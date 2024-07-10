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
  Grid,
  GridItem,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
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
      annual_subscription_price:userInfo.annual_subscription_price?userInfo.annual_subscription_price:"",
      male_female_allow:userInfo.male_female_allow?userInfo.male_female_allow:"",
      timing:userInfo.timing?userInfo.timing:"",
      gym_equipments:userInfo.gym_equipments?userInfo.gym_equipments:"",
      total_occupancy:userInfo.total_occupancy?userInfo.total_occupancy:"",
      no_of_trainer_available:userInfo.no_of_trainer_available?userInfo.no_of_trainer_available:""
    });
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Flex
        align="center"
        justifyContent={"center"}
        alignItems={"center"}
      // mb={1}
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
      <Grid
        templateColumns='repeat(2, 1fr)'
        gap={4}>
        <GridItem colSpan={1} >

          <Container

            maxW={"max-content"}
            width={"100wh"}
            height={"85.9vh"}
            display={'flex'}
            alignItems={"center"}
          >

            <Box
              position="relative"
              display={"flex"}
              justifyContent={"center"}
              
              boxShadow="md"
              borderRadius="md"

              p={"20px"}
              backgroundColor={"#686D76"}
            >
              <QRCodeDisplay
                data={qrData}
                borderBottomLeftRadius={2}
                borderTopLeftRadius={2}
              />
            </Box>

          </Container>
        </GridItem>

        <GridItem colSpan={1} >

          {/* <Container
            maxW={"max-content"}
            width={"100wh"}
            height={"85.9vh"}
            display={'flex'}
            alignContent={"center"}
          > */}
            {/* <Flex
              mt={10}
              // mb={100}
              align={"center"}
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
            > */}


<Flex
alignItems={"center"}
height={"85vh"}
justifyContent={"center"}
>

<Grid
m={10} mr={20}
alignItems={"center"}
        templateColumns='repeat(2, 1fr)'
        gap={4}>
          <GridItem colSpan={1}>
              <CardComponent
                heading="1"
                text="Workouts attended in last 7 days"
                image="./session.jpeg"
              />
              </GridItem>

              <GridItem colSpan={1}>
              <CardComponent
                heading="832"
                text="Workouts attended in previous month"
                image="./previous.jpeg"
              />
              </GridItem>

              <GridItem colSpan={2}>
              <Card pb={10}
              bg={"#686D76"} textColor={"white"}>
                <CardBody>
                 
                  <Stack mt="6" spacing="3">
                    <Heading size="lg">Balance </Heading>
                    <Text style={{
                      textAlign:'center',
                      fontSize:'60px',
                      fontWeight:'bold'
                    }}>₹832.00</Text>
                  </Stack>
                </CardBody>
              </Card>
              </GridItem>
              </Grid>
              </Flex>
            {/* </Flex> */}
          {/* </Container> */}
        </GridItem>

      </Grid>
    </div>
  );
};

export default Dashboard;
