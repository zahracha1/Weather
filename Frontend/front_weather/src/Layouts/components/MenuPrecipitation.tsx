import { Flex} from "@chakra-ui/react";
import  Chartsprecipitation  from "./Chartsprecipitation/Chartsprecipitation";
import Circulairepresipitation from"./Circulaireprecipitation/Circulairepresipitation";
import { Daysprecipitation } from "./Daysprecipitation/Daysprecipitation";

export const MenuPrecipitation= () => (

   <Flex flexDirection='column' w="100%" display="flex"  h="90%" m="2"  >
      <Flex flexDirection={"row"}  justifyContent="space-between"  w="100%"     >    
        <Chartsprecipitation />
        <Circulairepresipitation  />  
      </Flex>
      <Flex display="flex" flexDirection="row" w="100%" justifyContent="center" alignItems="center" p="2rem" >
        <Daysprecipitation/>
      </Flex>
    </Flex> 
 
);

