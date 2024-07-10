import React from "react";
import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";

const CardComponent = ({ heading, text, image }) => {
  return (
    <Card maxW="sm" bg={"#686D76"} textColor={"white"}>
      <CardBody>
        <Image
          src={image}
          height={"300px"}
          width={"350px"}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="lg">{heading}</Heading>
          <Text style={{fontSize:'20px'}}>{text}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
