import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    gymName: "",
    ownerName: "",
    photos: "",
    description: "",
    location: "",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  let navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

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
    console.log(formData);
    if (
      !formData.name ||
      !formData.password ||
      !formData.email ||
      !formData.description ||
      !formData.location ||
      !formData.ownerName ||
      !formData.gymName
    ) {
      toast({
        title: "Please fill all the details",
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      console.log(formData.photos);
      setLoading(true);
      const uploadedImageURLs = await uploadImages(formData.photos);

      console.log(uploadedImageURLs);

      await saveFormData({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gymName: formData.gymName,
        ownerName: formData.ownerName,
        description: formData.description,
        location: formData.location,
        photos: uploadedImageURLs,
      });

      setFormData({
        photos: [],
        description: "",
        location: "",
        name: "",
        gymName: "",
        ownerName: "",
        email: "",
        password: "",
      });
      // document.location.reload();
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const saveFormData = async ({
    name,
    email,
    password,
    gymName,
    ownerName,
    description,
    location,
    photos,
  }) => {
    try {
      console.log({
        name,
        email,
        password,
        gymName,
        ownerName,
        description,
        location,
        photos,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          gymName,
          ownerName,
          description,
          location,
          photos,
        },
        config
      );

      toast({
        title: "Registration successfully",
        status: "success",
        duration: 5000,
        position: "bottom-right",
      });
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving form data:", error);
      throw error;
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
    } catch (err) {
      toast({
        title: "Error Occured",
        description: err.response.data.message,
        status: "warning",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="24px" backgroundColor={""}>
      <FormControl isRequired>
        <FormLabel>Name: </FormLabel>
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email: </FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        ></Input>
      </FormControl>

      <FormControl m="10px 0 10px 0" isRequired>
        <FormLabel>Password: </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            // border="none"
            // borderBottom="2px solid white" // Adding bottom border
            // borderRadius="0" // Ensuring no rounded corners
            // _focus={{
            //   borderBottomColor: "blue", // Color when the input is focused
            //   boxShadow: "none", // Removes default focus ring
            // }}
          ></Input>
          <InputRightElement width="4.5em" p="3px 0 3px 0">
            <Button onClick={handleClick} colorScheme="blue">
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="photos">
        <FormLabel>Gym Photos</FormLabel>
        <Input
          type="file"
          name="photos"
          onChange={handleChange}
          accept="image/*"
          multiple
          required
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Gym Name: </FormLabel>
        <Input
          name="gymName"
          type="text"
          onChange={handleChange}
          placeholder="Enter gym name"
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Owner Name: </FormLabel>
        <Input
          type="text"
          name="ownerName"
          onChange={handleChange}
          placeholder="Enter gym owner name"
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Description: </FormLabel>
        <Input
          type="text"
          name="description"
          onChange={handleChange}
          placeholder="Enter gym description"
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Location: </FormLabel>
        <Input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="Enter gym location"
          // border="none"
          // borderBottom="2px solid white" // Adding bottom border
          // borderRadius="0" // Ensuring no rounded corners
          // _focus={{
          //   borderBottomColor: "blue", // Color when the input is focused
          //   boxShadow: "none", // Removes default focus ring
          // }}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
