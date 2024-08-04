import { IoLocationOutline } from "react-icons/io5";
import {
  Box,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  Icon,
  Image,
} from "@chakra-ui/react";
import { MdOutlineWaterDrop } from "react-icons/md";
import { useQuery } from "react-query";
import { fetchmeanTemperature } from "../../../Services/Temperature/Temperaturemeanservices";
import { fetchweathercodes } from "../../../Services/Weathercodes/Weathercodedaily";
import { fetchmeanhumidity } from "../../../Services/Humidity/MeanHmidity";
import { fetchmeanwind } from "../../../Services/Windspeed/MeanWindservices";
import { fetchmeanprecipitation } from "../../../Services/Precipitation/Meanprecipiservices";
import Charcloud from "../Cartscloud/charcloud";
import { useState, useEffect } from "react";
import useSelectedCity from "../../../react-query/selectedCity";
import { motion } from "framer-motion";
export const SCard = () => {


  const { selectedCity, setSelectedCity } = useSelectedCity();
  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, []);


  useEffect(() => {
    refetcMeanTemperature();
  }, [selectedCity]);
  const [] = useState<boolean>(false);
  

  useEffect(() => {
    refetchMeanwind();
  }, [selectedCity]);
  const [] = useState<boolean>(false);

  useEffect(() => {
    refetchMeanpreci();
  }, [selectedCity]);
  const [] = useState<boolean>(false);


  useEffect(() => {
    refetchMeanhumidity();
  }, [selectedCity]);
  const [] = useState<boolean>(false);

  useEffect(() => {
    refetcMeanweathercodes();
  }, [selectedCity]);
  const [] = useState<boolean>(false);
  
  
  //const cityName = "Sousse";

  const { data: windData,
    refetch: refetchMeanwind, } = useQuery({
    queryKey: ["wind_speed", selectedCity],
    queryFn: () => fetchmeanwind(selectedCity || "Sousse"),
  });
  const wind = windData ? windData[0]._value.toFixed(1) : null;

  const { data: PrecipitationData , refetch: refetchMeanpreci, } = useQuery({
    queryKey: ["Precipitation", selectedCity],
    queryFn: () => fetchmeanprecipitation(selectedCity || "Sousse"),
  });

  const Precipitation = PrecipitationData
    ? PrecipitationData[0]._value.toFixed(1)
    : null;

  const { data: humidityData ,refetch: refetchMeanhumidity, } = useQuery({
    queryKey: ["relative_humidity", selectedCity],
    queryFn: () => fetchmeanhumidity(selectedCity || "Sousse"),
  });
  const Humidity = humidityData ? humidityData[0]._value.toFixed(0) : null;

  const { data: meanTemperature , refetch: refetcMeanTemperature,} = useQuery({
    queryKey: ["mean_Temperature",  selectedCity],
    queryFn: () => fetchmeanTemperature( selectedCity || "Sousse"),
  });
  const FmeanTemperature = meanTemperature
    ? meanTemperature[0]._value.toFixed(1)
    : null;
  const city = meanTemperature ? meanTemperature[0].city : null;

  const { data: weathercodes , refetch: refetcMeanweathercodes, } = useQuery({
    queryKey: ["weather_codes",  selectedCity],
    queryFn: () => fetchweathercodes(selectedCity || "Sousse"),
  });

  const Codes = weathercodes ? weathercodes[0].condition : null;

  return (
    <Box
      bgGradient="linear(to-b, #191B1F,#22465F,#3B97AF)"
      w="65%"
      h="270px"
      padding={"1rem"}
      borderRadius="10px"
      display="flex"
      flexDirection="row"
      justifyContent={"space-between"}
      as={motion.div}
      initial={{x: "50px",opacity:0}}
      animate={{x: "0",opacity:1,transition: { duration: 1 }}}
     
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        display="flex"
        w="60%"
        paddingInline={"1rem"}
        as={motion.div}
        initial={{ y: "-50px", opacity: 0 }}
        animate={{ y: "0", opacity: 1 ,transition: { duration: 1 }}}
        
      >
        <HStack
          alignItems="start"
          flexDirection="row"
          justifyContent="space-between"
          display="flex"
          w="100%"
        
        >
          <Flex>
            <Icon
              as={IoLocationOutline}
              w={5}
              h={7}
              color={useColorModeValue("white", "white")}
            />
            <Text
              m={1}
              fontSize={17}
              fontStyle={"bold"}
              color={useColorModeValue("white", "white")}
            >
              {city}, Tunisie{" "}
            </Text>
          </Flex>{" "}
          <Text
            m={1}
            fontSize={17}
            fontStyle={"bold"}
            color={useColorModeValue(
              "RGBA(255, 255, 255, 0.48)",
              "RGBA(255, 255, 255, 0.48)"
            )}
          >
            Today{" "}
          </Text>
        </HStack>

        <Text
          h="36%"
          fontSize={60}
          fontStyle={"bold"}
          color={useColorModeValue("white", "white")}
        >
          {FmeanTemperature}°
        </Text>
        <Text
          fontSize={20}
          fontStyle={"bold"}
          color={useColorModeValue("white", "white")}
        >
          {Codes}{" "}
        </Text>

        <HStack
          alignItems="start"
          flexDirection="row"
          justifyContent="space-between"
          display="flex"
          w="100%"
          m="3"
        >
          <Flex alignItems="start" flexDirection="column" h="50%">
            <Text
              fontSize={23}
              fontStyle={"bold"}
              color={useColorModeValue("white", "white")}
            >
              Wind_Speed{" "}
            </Text>
            <Flex
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              h="90%"
            >
              <Image src="\src\assets\wind.svg" alt="sunny" boxSize="45px" />
              <Text
                fontSize={21}
                fontStyle={"bold"}
                color={useColorModeValue("white", "white")}
              >
                {wind} km/h{" "}
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems="start" flexDirection="column" h="30%">
            <Text
              fontSize={23}
              fontStyle={"bold"}
              color={useColorModeValue("white", "white")}
            >
              Humidity{" "}
            </Text>
            <Flex
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
            >
              <Icon
                as={MdOutlineWaterDrop}
                w={7}
                h={7}
                color={useColorModeValue("white", "white")}
                fontStyle={"bold"}
              />
              <Text
                fontSize={26}
                fontStyle={"bold"}
                color={useColorModeValue("white", "white")}
              >
                {Humidity} %
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems="start" flexDirection="column" h="40%">
            <Text
              fontSize={23}
              fontStyle={"bold"}
              color={useColorModeValue("white", "white")}
            >
              Precipitation{" "}
            </Text>
            <Flex
              alignItems="center"
              flexDirection="row"
              justifyContent="center"
              h="90%"
            >
              <Image src="\src\assets\smoke.svg" alt="sunny" boxSize="60px" />
              <Text
                fontSize={26}
                fontStyle={"bold"}
                color={useColorModeValue("white", "white")}
              >
                {Precipitation} mm
              </Text>
            </Flex>
          </Flex>
        </HStack>
      </Flex>

      <Charcloud  />
    </Box>
  );
};
