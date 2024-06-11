import React,{useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Container,Flex,Input,Button} from '@chakra-ui/react'
import CardComponent from '../components/Card'
import {useNavigate} from 'react-router-dom'


const Dashboard = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    if(!userInfo){
    navigate("/");
    }
},[navigate]);

  return (
    <div>
      <Navbar/>
      
      <Container maxW={'700px'} >
      <Flex align="center" justifyContent={'center'} alignItems={'center'} mb={4}>
      <Input placeholder="Enter URC code" mr={2} mt={8} maxW={'400px'}  position={'relative'}/>
      <Button colorScheme="teal"  mt={8}  borderTopLeftRadius={0} borderBottomLeftRadius={0} >Apply</Button>
    </Flex>
     <Flex align={'center'} flexWrap={'wrap'} justifyContent={'space-between'}>
      <CardComponent heading="0" text="Upcoming workouts" image="./download.jpeg" />
      <CardComponent heading="1" text="Workouts attended in last 7 days" image="./download.jpeg" />
      <CardComponent heading="832" text="Workouts attended in previous month" image="./download.jpeg" />
      <CardComponent heading="103090" text="Expected payment in previous months" image="./download.jpeg" />
     </Flex>
    </Container>
    </div>
  )
}

export default Dashboard