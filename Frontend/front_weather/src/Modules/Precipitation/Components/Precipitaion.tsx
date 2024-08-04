import {
  Flex,
  HStack,
  useColorModeValue,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  FlexContainerStyle,
  flexContainerStyle1,
} from "../../Home/styles/homeStyle";
import { SearchBar } from "../../../Layouts/components/Navelements/SearchBar";
import { Coinuser } from "../../../Layouts/components/Navelements/Coinuser";
import { MenuPrecipitation } from "../../../Layouts/components/MenuPrecipitation";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
const Precipitaion = () => {

  const handleToastClick = () => {
    toast({
      title: "Daily Precipitation",
      status: "success",
      isClosable: true,
    });
  };const toast = useToast();

  
  const navigate = useNavigate();
  const handleNavigateToDetails = (day: string) => {
    navigate(`/Details/Detailsprecip/${day}`);
  };
  return (
    <Flex
      as="main"
      bg={useColorModeValue('rgba(201, 203, 207, 0.3)', "#111015")}
      {...FlexContainerStyle}
      flexDirection={"column"}
    >
      <Flex {...flexContainerStyle1}>
        <SearchBar redirectPath="/Precipitation" />
        <Coinuser/>
      </Flex>
      <Flex flexDirection="row">
        <HStack spacing="2" ml={"7"}>
          <Icon _hover={{ color: "#932595" }} as={FaEye} w={7} h={8} />
          <Button
            h={"45px"}
            _hover={{ color: "#932595" }}
            colorScheme="teal"
            variant="outline"
            transition="all 0.3s ease"
            onClick={() => {handleNavigateToDetails("Details"); handleToastClick();}} 
            fontSize={"22"}
          >
            See more details about Today precipitation{" "}
          </Button>{" "}
        </HStack>
      </Flex>

      <Flex
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        margin="1rem"
      >
        <MenuPrecipitation />
      </Flex>
    </Flex>
  );
};
export default Precipitaion;
