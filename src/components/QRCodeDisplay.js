import React from 'react';
import QRCode from 'qrcode.react';
import { Flex, Box, Text } from '@chakra-ui/react';

const QRCodeDisplay = ({ data }) => {
  // Flatten and concatenate all data into a single string
  const concatenatedData = Object.entries(data)
    .map(([label, value]) => {
      if (Array.isArray(value)) {
        // Join the array of photos into a single string
        return value.join(',');
      }
      return `${label}: ${value.toString()}`;
    })
    .join(',');

  return (
    <Flex direction="column" alignItems="center">
      <Box m="4" border={2}>
        {/* Generate QR code for the concatenated data */}
        <QRCode value={concatenatedData} size={256}/>
        <Text m="2">QR Code</Text>
      </Box>
    </Flex>
  );
};

export default QRCodeDisplay;
