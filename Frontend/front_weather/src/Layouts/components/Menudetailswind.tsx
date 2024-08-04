import React from 'react'
import { Flex } from "@chakra-ui/react";
import { Detailswind } from './Detailswind/Detailswind';

export const Menudetailswind = () => (
  <React.Fragment>
    <Flex flexDirection='column' w="100%" display="flex" justifyContent="center" alignItems="center"  p="1rem">
      <Detailswind />
    </Flex>
  </React.Fragment>
);