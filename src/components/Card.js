import React from 'react'
import {Card,CardBody,Image,Stack,Heading,Text} from '@chakra-ui/react'

const CardComponent = ({heading,text,image}) => {
  return (
    <Card maxW='sm' m={2}>
    <CardBody>
    <Image
      src={image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{heading}</Heading>
      <Text>
      {text}
      </Text>
     
    </Stack>
  </CardBody>
 
</Card>
  )
}

export default CardComponent