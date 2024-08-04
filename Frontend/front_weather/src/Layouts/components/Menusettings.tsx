import React from 'react'
import { Flex } from "@chakra-ui/react";
import Contenusettings from './Settings/Contenusettings';


const Menusettings = () => {
  return (
    <React.Fragment>
    <Flex flexDirection='column' w="150%" display="flex" justifyContent="center"  alignItems="center" >
     <Contenusettings/>
    </Flex>
  </React.Fragment>       
  )
}
export default Menusettings;
