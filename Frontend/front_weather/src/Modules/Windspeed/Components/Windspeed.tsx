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
import { Menuwindspeed } from "../../../Layouts/components/Menuwindspeed";
import { useToast } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Windspeed = () => {
  const navigate = useNavigate();
  const handleNavigateToDetails = (day: string) => {
    navigate(`/Details/Detailswind/${day}`);
  };

  const toast = useToast();

  const handleToastClick = () => {
    toast({
      title: " Daily Wind Speed ",
      status: "success",
      isClosable: true,
    });
  };

  return (
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
        <HStack spacing="2" ml={"7"}>
          <Icon _hover={{ color: "#932595" }} as={FaEye} w={7} h={8} />
          <Button
            h={"45px"}
            _hover={{ color: "#932595" }}
            colorScheme="teal"
            variant="outline"
            transition="all 0.3s ease"
            fontSize={"22"}
            onClick={() => {
              handleNavigateToDetails("Wind");
              handleToastClick();
            }}
          >
            See more details about Today Wind speed{" "}
          </Button>{" "}
        </HStack>
      </Flex>

      <Flex
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        margin="1rem"
      >
        <Menuwindspeed />
      </Flex>
    </Flex>
  );
};
export default Windspeed;
