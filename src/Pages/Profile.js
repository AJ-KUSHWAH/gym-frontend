import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import backgroundImage from "./../assets/gym-bg1.jpeg";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  useDisclosure,
  Spinner,
  Box,
  Center,
  Card,
  Flex,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import QRCodeDisplay from "../components/QRCodeDisplay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Carousel from "../components/Carousel";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      navigate("/");
    }

    setPhotos(userInfo.photos);
    setUserData(userInfo);
    setFormData({
      photos: userInfo.photos,
      location: userInfo.location,
      gymName: userInfo.gymName,
      ownerName: userInfo.ownerName,
      description: userInfo.description,
      annual_subscription_price:userInfo.annual_subscription_price?userInfo.annual_subscription_price:"",
      male_female_allow:userInfo.male_female_allow?userInfo.male_female_allow:"",
      timing:userInfo.timing?userInfo.timing:"",
      gym_equipments:userInfo.gym_equipments?userInfo.gym_equipments:"",
      total_occupancy:userInfo.total_occupancy?userInfo.total_occupancy:"",
      no_of_trainer_available:userInfo.no_of_trainer_available?userInfo.no_of_trainer_available:""
    });

    setLoading(false);
  }, [navigate]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [photos, setPhotos] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const finalRef = React.useRef(null);

  const [formData, setFormData] = useState({
    photos: "",
    description: "",
    location: "",
    gymName: "",
    ownerName: "",
    annual_subscription_price:"",
    gym_equipments:"",
    timing:"",
    no_of_trainer_available:"",
    total_occupancy:"",
    male_female_allow:""
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files });
    } else {
      const value = e.target.value;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const uploadedImageURLs = await uploadImages(formData.photos);

      await updateFormData({
        gymName: formData.gymName,
        ownerName: formData.ownerName,
        description: formData.description,
        location: formData.location,
        photos: uploadedImageURLs,
        annual_subscription_price:formData.annual_subscription_price,
        gym_equipments:formData.gym_equipments,
        timing:formData.timing,
        no_of_trainer_available:formData.no_of_trainer_available,
        total_occupancy:formData.total_occupancy,
        male_female_allow:formData.male_female_allow
      });

      setFormData({
        photos: [],
        description: "",
        location: "",
        gymName: "",
        ownerName: "",
        annual_subscription_price:"",
        gym_equipments:"",
        timing:"",
        no_of_trainer_available:"",
        total_occupancy:"",
        male_female_allow:""
      });
      document.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const uploadImages = async (files) => {
    try {
      const uploadedImageURLs = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "ssn4aynv");
          formData.append("cloud_name", "dwtkr7m8s");
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dwtkr7m8s/image/upload",
            formData
          );
          return response.data.secure_url;
        })
      );
      return uploadedImageURLs;
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      throw error;
    }
  };

  const updateFormData = async ({
    gymName,
    ownerName,
    location,
    description,
    photos,
    annual_subscription_price,
    gym_equipments,
    timing,
    no_of_trainer_available,
    total_occupancy,
    male_female_allow
  }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/user/update",
        {
          gymName,
          ownerName,
          location,
          description,
          photos,
          annual_subscription_price,
          gym_equipments,
          timing,
          no_of_trainer_available,
          total_occupancy,
          male_female_allow,
          userId: userInfo._id,
        },
        config
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.updatedUserDetails)
      );
      toast({
        title: "Gym Updated successfully",
        status: "success",
        duration: 5000,
        position: "bottom-right",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error saving form data:", error);
      throw error;
    }
  };

  return (
    <div>
      <Navbar />
      {loading && (
        <Spinner
          alignSelf={"center"}
          margin={"auto"}
          style={{
            position: "fixed",
            top: "45%",
            left: "45%",
            zIndex: 10000,
          }}
          height={"100px"}
          width={"100px"}
        />
      )}

      <>
        <Box>
          <Carousel cards={photos} maxW={"fit-content"} />
        </Box>

        <Box
          h={"100vh"}  
          alignContent={"center"}
          bgImage="url('/assets/gym-bg1.jpeg')"
        >
          <Flex minW={"-moz-fit-content"} alignContent={"center"}>
            <Card marginInline={"10%"}  height={"672px"}  w={"500px"}>
              <Text textAlign={"center"} fontSize={"5xl"}>
                Gym Details
              </Text>
              <Box>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Gym Name</Text>
                  <Text fontSize={"xl"}>{userData.gymName}</Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Owner Name</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.ownerName}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Description</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.description}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Location</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.location}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Annual Subscription Price</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.annual_subscription_price}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Male Female Allow</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.male_female_allow}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Gym Equipments</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.gym_equipments}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Timing</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.timing}
                  </Text>
                </div>

                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>Total Occupancy</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.total_occupancy}
                  </Text>
                </div>
                <div
                  style={{
                    padding: "10px 20px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontSize={"xl"}>No of trainers available</Text>
                  <Text fontSize={"xl"} style={{ float: "right" }}>
                    {userData.no_of_trainer_available}
                  </Text>
                </div>
              </Box>

              <Button
                colorScheme="blue"
                style={{ float: "right", margin: "0 20px 10px" }}
                onClick={() => {
                  onOpen();
                }}
              >
                Update Gym Details
              </Button>
            </Card>
            <Card
              justifyContent={"center"}
              alignContent={"center"}
              maxW={"fit-content"}
              height={"fit-content"}
              bgColor={"#686D76"}
            //   mt={"100px"}
              ml={"200px"}
            >
              <QRCodeDisplay data={formData} /> 
            </Card>
          </Flex>
        </Box>
      </>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="550px">
          <ModalHeader style={{ fontSize: "40px" }}>
            Add Gym Details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} mt={10}>
              <FormControl id="photos">
                <FormLabel fontSize={20}>Photos</FormLabel>
                <Input
                  type="file"
                  name="photos"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                  required
                />
              </FormControl>
              <FormControl id="gymName">
                <FormLabel fontSize={20}>Gym Name</FormLabel>
                <Input
                  type="text"
                  name="gymName"
                  value={formData.gymName}
                  onChange={handleChange}
                  placeholder="Enter gym name"
                  required
                />
              </FormControl>
              <FormControl id="ownerName">
                <FormLabel fontSize={20}>Owner Name</FormLabel>
                <Input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                  required
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel fontSize={20}>Description</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Enter gym description"
                  required
                />
              </FormControl>
              <FormControl id="location">
                <FormLabel fontSize={20}>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter gym location"
                  required
                />
              </FormControl>
              <FormControl id="annual_subscription_price">
                <FormLabel fontSize={20}>Annual Subscription Price</FormLabel>
                <Input
                  name="annual_subscription_price"
                  onChange={handleChange}
                  value={formData.annual_subscription_price}
                  placeholder="Enter annual subscription price"
                  required
                />
              </FormControl>
              <FormControl id="gym_equipments">
                <FormLabel fontSize={20}>Gym equipments</FormLabel>
                <Input
                  name="gym_equipments"
                  onChange={handleChange}
                  value={formData.gym_equipments}
                  placeholder="Enter gym equipments"
                  required
                />
              </FormControl>
              <FormControl id="male_female_allow">
                <FormLabel fontSize={20}>Male Female Allow</FormLabel>
                <Input
                  name="male_female_allow"
                  onChange={handleChange}
                  value={formData.male_female_allow}
                  placeholder="Enter which are allowed"
                  required
                />
              </FormControl>
              <FormControl id="timing">
                <FormLabel fontSize={20}>Timing</FormLabel>
                <Input
                  name="timing"
                  onChange={handleChange}
                  value={formData.timing}
                  placeholder="Enter timing"
                  required
                />
              </FormControl>
              <FormControl id="total_occupancy">
                <FormLabel fontSize={20}>Total Occupancy</FormLabel>
                <Input
                  name="total_occupancy"
                  onChange={handleChange}
                  value={formData.total_occupancy}
                  placeholder="Enter total occupancy"
                  required
                />
              </FormControl>
              <FormControl id="no_of_trainer_available">
                <FormLabel fontSize={20}>Number of Trainer Available</FormLabel>
                <Input
                  name="no_of_trainer_available"
                  onChange={handleChange}
                  value={formData.no_of_trainer_available}
                  placeholder="Enter number of trainer available"
                  required
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Profile;
