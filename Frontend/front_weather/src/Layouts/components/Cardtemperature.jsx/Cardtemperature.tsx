import {
  Box,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { fetchdailyTemperature } from "../../../Services/Temperature/Temperatureservicesdaily";
import { useQuery } from "react-query";
import { fetchTemperature } from "../../../Services/Temperature/Temperatureservices";
import { format, addDays } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSelectedCity from "../../../react-query/selectedCity";
import {motion} from 'framer-motion'
export const Cardtemperature: React.FC = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();
  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, []);

  useEffect(() => {
    refetchTemperature();
  }, [selectedCity]);
  const [] = useState<boolean>(false);

  useEffect(() => {
    refetchourlytempertaure();
  }, [selectedCity]);
  const [] = useState<boolean>(false);

  const [clicked, setClicked] = useState<boolean>(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  //les données réelles
 
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    setStartDate(format(today, "yyyy-MM-dd"));
    setEndDate(format(nextWeek, "yyyy-MM-dd"));
  }, []);

  // Utiliser useQuery pour récupérer les données de température quotidienne
  const { data: dailyTemperatureData, refetch: refetchTemperature } = useQuery({
    queryKey: ["daily_temperature", selectedCity],
    queryFn: () => fetchdailyTemperature(selectedCity),
  });

  const { data: hourlytempertaure, refetch: refetchourlytempertaure } =
    useQuery({
      queryKey: ["temperature", selectedCity, startDate, endDate],
      queryFn: () => fetchTemperature(selectedCity, startDate, endDate),
    });

  const handleNavigateToDetails = (day: string) => {
    navigate(`/DetailsTemperature/${day}`);
  };
  const navigate = useNavigate();
  const city = dailyTemperatureData ? dailyTemperatureData[0].city : null;

  return (
    <Box
      bgGradient="linear(to-b, #191B1F,#22465F,#3B97AF)"
      h="48rem"
      borderRadius="10px"
      w="36%"
      mt="12"
      as={motion.div}
            initial={{x: "-50px",opacity:0}}
            animate={{x: "0",opacity:1,transition: { duration: 1 }}}
    >
      <Flex flexDirection="column">
        <HStack
          spacing="20"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text
            m={3}
            fontSize={20}
            fontStyle={"bold"}
            color={useColorModeValue("white", "white")}
          >
            Weather This Week
          </Text>

          <Image
            src={
              clicked
                ? "/src/assets/wi_celsius.svg"
                : "/src/assets/wi_fahrenheit.svg"
            }
            alt="unité"
            boxSize="62px"
            onClick={handleClick}
            cursor="pointer"
          />
        </HStack>
        <Flex flexDirection="row" justifyContent="space-between">
          <Text m={3} mt="-3"  color={useColorModeValue('white', 'white')}>
            {city}, Tunisia
          </Text>
          <Text
            m={3}
            mt="-3"
            _hover={{ color: "#932595" }}
            color={useColorModeValue('white', 'white')}
            cursor={"pointer"}
            padding={"1rem"}
            onClick={() => handleNavigateToDetails("Details")}
            fontSize={"20px"}
            pt={"1px"}
          >
            {" "}
            See more Details{" "}
          </Text>
        </Flex>
      </Flex>

      <Flex flexDirection="row" alignItems="center" gap={"3rem"} w="100%" as={motion.div}
            initial={{x: "-50px",opacity:0}}
            animate={{x: "0",opacity:1,transition: { duration: 1 }}}>
        {hourlytempertaure?.slice(0, 3).map((element: any, index: number) => {
          return (
            <Box w="22%" h="110" bg="#1B1B1D" ml="7" borderRadius="10px" as={motion.div}
            initial={{x: "-50px",opacity:0}}
            animate={{x: "0",opacity:1,transition: { duration: 1 }}}>
              <Flex
                alignItems="center"
                flexDirection="column"
                justifyContent="space-between"
                m="2"
              >
                <Text
                  fontStyle={"bold"}
                  color={useColorModeValue("white", "white")}
                >
                  {"0" + index + ":00"}
                </Text>
                <Image
                  src="\src\assets\thunderstorms-night.svg"
                  alt="sunny"
                  boxSize="50px"
                />
                <Text
                  fontStyle={"bold"}
                  color={useColorModeValue("white", "white")}
                >
                  {element._value}°
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Flex>

      {dailyTemperatureData?.slice(0, 6).map((element: any) => (
        <Box w="94%" h="9%" bg="#1B1B1D" borderRadius="10px" m="5" >
          <Flex 
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            m="3"
            p="2"
            as={motion.div}
            initial={{x: "-40px",opacity:0}}
            animate={{x: "0",opacity:1,transition: { duration: 1 }}}
        
          >
            <Image src="\src\assets\sunny.svg" alt="sunny" boxSize="45px" />
            <Text
              fontSize={"22"}
              fontStyle={"bold"}
              color={useColorModeValue("white", "white")}
            >
              {element._value}°
            </Text>
            <Text
              fontSize={"22"}
              fontStyle={"bold"}
              color={useColorModeValue("white", "white")}
            >
              {element._time}
            </Text>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};
