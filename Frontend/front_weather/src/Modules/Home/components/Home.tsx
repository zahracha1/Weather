import { Flex, HStack, useColorModeValue, Text} from "@chakra-ui/react";
import { FlexContainerStyle, flexContainerStyle1, flexContainerStyle2 } from "../styles/homeStyle";
import { Menu } from "../../../Layouts/components/Menu";
import { SearchBar } from "../../../Layouts/components/Navelements/SearchBar";
import { Coinuser } from "../../../Layouts/components/Navelements/Coinuser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

 
  const handleNavigateToTemperature = () => {
    navigate(`/Temperature`);
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
          <SearchBar redirectPath="/Home" />
          <Coinuser />
        </Flex>
        <Flex flexDirection="row">
          <HStack spacing="4" ml="4">
            <Text
              color="gray"
              fontSize="18"
              _hover={{ color: "#932595" }}
              onClick={() => navigate('/Home')}
              cursor="pointer"
            >
              Today
            </Text>
            <Text
              fontSize="18"
              _hover={{ color: "#932595" }}
              cursor="pointer"
              onClick={handleNavigateToTemperature}
            >
              Tomorrow
            </Text>
            <Text
              fontSize="18"
              _hover={{ color: "#932595" }}
              cursor="pointer"
              onClick={handleNavigateToTemperature}
            >
              Next 7 Days
            </Text>
          </HStack>
        </Flex>

        
        <Flex {...flexContainerStyle2}>
          <Menu />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
