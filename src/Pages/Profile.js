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
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo) {
            navigate("/");
        }
    }, [navigate]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [photos, setPhotos] = useState([]);
    const [update, setUpdate] = useState(false);
    const [gymData, setGymData] = useState({});
    const [loading, setLoading] = useState(false);
    const finalRef = React.useRef(null);


    const [formData, setFormData] = useState({
        photos: "",
        description: "",
        location: "",
        annual_membership_fees: "",
        name: ""
    });
    const [haveGym, setHaveGym] = useState(false);

    const fetchGymDetails = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.token
                }
            }
            setLoading(true);
            const { data } = await axios.get("/api/gym/fetchGym", config);

            if (data.message) {
                setHaveGym(false);
            } else {
                setHaveGym(true);
                setPhotos(data.photos);
                setGymData(data);
                setFormData({
                    photos: data.photos,
                    location: data.location,
                    name: data.name,
                    description: data.description,
                    annual_membership_fees: data.annual_membership_fees
                })

            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchGymDetails();
        console.log("hello");
    }, []);

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

            if (update) {
                await updateFormData({
                    name: formData.name,
                    description: formData.description,
                    location: formData.location,
                    annual_membership_fees: formData.annual_membership_fees,
                    photos: uploadedImageURLs,
                });
            } else {
                await saveFormData({
                    name: formData.name,
                    description: formData.description,
                    location: formData.location,
                    annual_membership_fees: formData.annual_membership_fees,
                    photos: uploadedImageURLs,
                });
            }

            setFormData({
                photos: [],
                description: "",
                location: "",
                annual_membership_fees: "",
                name: ""
            });
            document.location.reload();
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

    const saveFormData = async (formData) => {

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.token
            }
        }
        try {

            await axios.post("/api/gym/addGym", formData, config);

            toast({
                title: 'Gym Registered successfully',
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

    const updateFormData = async (formData) => {

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.token
            }
        }
        try {
            setLoading(true);
            await axios.post("/api/gym/updateGym", formData, config);

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

    const deleteGym = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.token
            }
        }
        try {
            setLoading(true);
            await axios.get("/api/gym/deleteGym", config);

            toast({
                title: 'Gym deleted successfully',
                status: 'success',
                duration: 5000,
                position: 'bottom-right'

            })
            setLoading(false);
            document.location.reload();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

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

            {(!haveGym) ? (
                <Button onClick={() => { onOpen(); setUpdate(false); }} mt={10}>Add Gym Details</Button>
            ) : (
                <>
                    <Carousel cards={photos} />
                    <Text fontSize={'5xl'}>Gym Details</Text>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Name</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{gymData.name}</Text>
                    </div>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Description</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{gymData.description}</Text>
                    </div>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Location</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{gymData.location}</Text>
                    </div>
                    <div style={{ 'padding': '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Text fontSize={'4xl'}>Annual Membership Fees</Text>
                        <Text fontSize={'4xl'} style={{ 'float': 'right' }}>{gymData.annual_membership_fees}</Text>
                    </div>

                    <QRCodeDisplay data={formData} />

                    <Button colorScheme="red" style={{ float: 'right', margin: '0 20px 10px' }} onClick={() => { deleteGym(); }}>Delete Gym Details</Button>
                    <Button colorScheme="blue" style={{ float: 'right', margin: '0 20px 10px' }} onClick={() => { onOpen(); setUpdate(true); }} >Update Gym Details</Button>
                </>
            )}

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
                            <FormControl id="name">
                                <FormLabel fontSize={20}>Name</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
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
                            <FormControl id="annualMembershipFees">
                                <FormLabel fontSize={20}>Annual Membership Fees</FormLabel>
                                <Input
                                    type="number"
                                    name="annual_membership_fees"
                                    value={formData.annual_membership_fees}
                                    onChange={handleChange}
                                    placeholder="Enter annual membership fees"
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