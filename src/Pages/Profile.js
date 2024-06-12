import Navbar from '../components/Navbar'
import React, { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    VStack,
    useToast,
    useDisclosure,
    Spinner
} from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import QRCodeDisplay from '../components/QRCodeDisplay';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import Carousel from '../components/Carousel';

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
            gymName:userInfo.gymName,
            ownerName:userInfo.ownerName,
            description: userInfo.description
        })


    setLoading(false);
        
    }, [navigate]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [photos, setPhotos] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const finalRef = React.useRef(null);


    const [formData, setFormData] = useState({
        photos: "",
        description: "",
        location: "",
        gymName: "",
        ownerName:""
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

            console.log(formData.photos)
            setLoading(true);
            const uploadedImageURLs = await uploadImages(formData.photos);
            console.log(uploadedImageURLs);

                await updateFormData({
                    gymName: formData.gymName,
                    ownerName:formData.ownerName,
                    description: formData.description,
                    location: formData.location,
                    photos: uploadedImageURLs,
                });
         
            setFormData({
                photos: [],
                description: "",
                location: "",
                gymName: "",
                ownerName:""
            });
            // document.location.reload();
            console.log("Form submitted successfully!");
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
                    formData.append("cloud_name", "dwtkr7m8s")
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


    const updateFormData = async ({gymName,ownerName,location,description,photos}) => {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            setLoading(true);
           const response= await axios.post("/api/user/update", {gymName,ownerName,location,description,photos,userId:userInfo._id}, config);
           
            localStorage.setItem("userInfo",JSON.stringify(response.data.updatedUserDetails));
            toast({
                title: 'Gym Updated successfully',
                status: 'success',
                duration: 5000,
                position: 'bottom-right'

            })
            setLoading(false);
        } catch (error) {
            console.error("Error saving form data:", error);
            throw error;
        }
    };


    return (
        <div>
            <Navbar />
            {loading && <Spinner
                alignSelf={"center"}
                margin={"auto"}
                style={{
                    position: 'fixed',
                    top: '45%',
                    left: '45%',
                    zIndex: 10000
                }}
                height={"100px"}
                width={"100px"}
            />}

           
                <>
                    <Carousel cards={photos} />
                    <Text fontSize={'5xl'}>Gym Details</Text>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Gym Name</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{userData.gymName}</Text>
                    </div>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Owner Name</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{userData.ownerName}</Text>
                    </div>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Description</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{userData.description}</Text>
                    </div>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Location</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{userData.location}</Text>
                    </div>
                  

                    <QRCodeDisplay data={formData} />

                    <Button colorScheme="blue" style={{ float: 'right', margin: '0 20px 10px' }} onClick={() => { onOpen(); }} >Update Gym Details</Button>
                </>
        

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent maxW="550px">
                    <ModalHeader style={{ 'fontSize': '40px' }}>Add Gym Details</ModalHeader>
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
                           
                        </VStack>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button colorScheme='red' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default Profile