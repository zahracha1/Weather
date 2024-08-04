import { Flex } from "@chakra-ui/react";
import { Cardwind } from "./Cardwind/Cardwind";
import  Chartswind  from "./Chartswind/Chartswind";

export const Menuwindspeed = () => (
   <Flex flexDirection='column' w="100%" display="flex"  h="100%" >
      <Flex display="flex" justifyContent="space-between"  w="100%" alignItems={"center"}  >
        <Cardwind/>
        <Chartswind />
      </Flex>
    </Flex> 

);

