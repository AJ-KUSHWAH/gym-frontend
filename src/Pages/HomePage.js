import React, { useEffect } from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import '../App.css'

import SignUp from '../components/SignUp';
import Login from '../components/Login';

const HomePage = () => {

  const navigate=useNavigate();

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userInfo"));

    if(user){
      navigate("/dashboard");
    }

  },[navigate]);

  return (
    <div className="App">
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        m="40px 0 15px 0"
        p={3}
        borderRadius="lg"
        borderWidth="1px"
        background={"white"}
        width="100%"
      >
        <Text textAlign={"center"} fontSize={"30px"}>
         FitRaga
        </Text>
      </Box>

      <Tabs variant="soft-rounded"  width="100%"  borderRadius="lg"
        borderWidth="1px"
        background={"white"}>
        <TabList m="10px 0 10px 0">
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
