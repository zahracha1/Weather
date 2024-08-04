import {
  Flex,
  Text,
  Box,
  HStack,
  useColorModeValue,
  Image,
  Center,
  Divider,
  Icon,
  useToast,

} from "@chakra-ui/react";

import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar, FaStar } from "react-icons/fa";
import { fetchmeanTemperature } from "../../../Services/Temperature/Temperaturemeanservices";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import useSelectedCity from "../../../react-query/selectedCity";
import { fetchweathercodes } from "../../../Services/Weathercodes/Weathercodedaily";
import { useAddFavoriteCity } from "../../../Services/AddFavoritList/AddCity";
import { motion } from 'framer-motion';

export const FCard: React.FC = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const toast = useToast();

  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, [selectedCity, setSelectedCity]);

  useEffect(() => {
    const today = new Date();
    setStartDate(format(today, "yyyy-MM-dd"));
  }, []);

  useEffect(() => {
    refetchMeanTemperature();
  }, [selectedCity]);

  const [clicked, setClicked] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>();

  const {
    data: meanTemperature,
    refetch: refetchMeanTemperature,
  } = useQuery({
    queryKey: ["mean_Temperature", selectedCity],
    queryFn: () => fetchmeanTemperature(selectedCity),
  });

  const {
    data: weathercodes
  } = useQuery({
    queryKey: ["weather_codes", selectedCity],
    queryFn: () => fetchweathercodes(selectedCity),
  });
const { mutate: addFavoriteCity,} = useAddFavoriteCity();  const handleClick = async () => {
    setClicked(!clicked);
    try {
      await addFavoriteCity(selectedCity);
      console.log(`${selectedCity} added to favorites`);
      toast({
        title: 'City added to favorites.',
        description: `${selectedCity} has been added to your favorite list.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
        
      });
    } catch (error) {
      console.error('Failed to add to favorites:', error);
      toast({
        title: 'Failed to add city to favorites.',
        description: 'There was an error adding the city to your favorite list.',
        status: 'error',
        duration: 9000,
        isClosable: false,
      });
    }
  };

  const city = meanTemperature ? meanTemperature[0].city : null;

  return (
    <Box
      bgGradient="linear(to-b, #191B1F,#22465F,#3B97AF)"
      borderRadius="xl"
      w="390px"
      h="270px"
      alignItems="center"
      as={motion.div}
      initial={{ x: "-50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <HStack
        spacing="20"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        as={motion.div}
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
      >
        <Text
          m={3}
          fontSize={27}
          fontStyle={"bold"}
          color={useColorModeValue("white", "white")}
        >
          {meanTemperature ? meanTemperature[0]._value.toFixed(1) : null} °
        </Text>
        <Icon
          as={clicked ? FaStar : FaRegStar}
          onClick={handleClick}
          w={7}
          h={8}
          m="2"
        />
      </HStack>

      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        height="10%"
        as={motion.div}
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
      >
        <Image src="\src\assets\sunny.svg" alt="sunny" boxSize="150px" />
      </Flex>

      <Flex
        alignItems="center"
        flexDirection="row"
        justifyContent="center"
        p="9"
        pb="0"
      >
        <Center
          color="RGBA(255, 255, 255, 0.64)"
          fontSize={27}
          as={motion.div}
          initial={{ x: "-50px", opacity: 0 }}
          animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
        >
          {weathercodes && weathercodes[0]?.condition}
        </Center>
      </Flex>

      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        mt={"3"}
      >
        <Divider bg="#3DAAC0" borderWidth="1px" />
      </Flex>

      <HStack
        spacing="1"
        flexDirection="row"
        alignItems="center"
        as={motion.div}
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
      >
        <Icon
          as={IoLocationOutline}
          w={6}
          h={8}
          color={useColorModeValue("white", "white")}
          ml="2"
        />
        <Text mt={2} color={useColorModeValue("white", "white")}>
          {city}, Tunisie
        </Text>
      </HStack>

      <HStack
        spacing="1"
        flexDirection="row"
        alignItems="center"
        mb="1"
        as={motion.div}
        initial={{ x: "-50px", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
      >
        <Icon
          as={LuCalendarDays}
          w={6}
          h={8}
          color={useColorModeValue("white", "white")}
          ml="2"
        />
        <Text mt={2} color={useColorModeValue("white", "white")}>
          {startDate}
        </Text>
      </HStack>
    </Box>
  );
};
