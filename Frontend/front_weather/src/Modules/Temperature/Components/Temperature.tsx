import { Flex, HStack, useColorModeValue, Text, Box } from "@chakra-ui/react";
import { FlexContainerStyle, flexContainerStyle1 } from "../../Home/styles/homeStyle";
import { SearchBar } from "../../../Layouts/components/Navelements/SearchBar";
import { Coinuser } from "../../../Layouts/components/Navelements/Coinuser";
import { useNavigate } from "react-router-dom";
import { MenuTemperature } from "../../../Layouts/components/MenuTemperature";

const Temperature = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = (day: string) => {
    navigate(`/home?day=${day}`);
  };

  const handleNavigateToTemperature = (day: string) => {
    navigate(`/Temperature?day=${day}`);
  };

  return (
    <>
      <Flex
        as="main"
        bg={useColorModeValue('rgba(201, 203, 207, 0.3)', "#111015")}
        {...FlexContainerStyle}
        flexDirection={"column"}
      >
        <Flex {...flexContainerStyle1}>
          <SearchBar redirectPath={""} />
          <Coinuser />
        </Flex>
        <Flex flexDirection="row">
          <HStack spacing="4" ml="4">
            <Text 
              fontSize="18" 
              _hover={{ color: '#932595' }} 
              cursor={'pointer'} 
              onClick={() => handleNavigateToHome("Today")}
            >
              Today
            </Text>
            <Text 
              color="gray" 
              fontSize="18" 
              _hover={{ color: '#932595' }} 
              cursor={'pointer'} 
              onClick={() => handleNavigateToHome("Tomorrow")}
            >
              Tomorrow
            </Text>
            <Text 
              color="gray" 
              fontSize="18" 
              _hover={{ color: '#932595' }} 
              cursor={'pointer'} 
              onClick={() => handleNavigateToTemperature("Next 7 Days")}
            >
              Next 7 Days
            </Text>
          </HStack>
        </Flex>

        <Box p={5} h={'80%'}>
          <MenuTemperature />
        </Box>
      </Flex>
    </>
  );
};

export default Temperature;
