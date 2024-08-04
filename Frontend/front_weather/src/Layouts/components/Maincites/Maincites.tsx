import { Box, Flex, Text, useColorModeValue, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { fetchdailyminTemperature } from '../../../Services/Temperature/Temperaturemindailyservices';
import { fetchdailyTemperature } from "../../../Services/Temperature/Temperatureservicesdaily";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

export const Maincites = () => {
  const cities = [
    { name: 'Sousse', img: '/src/assets/overcast-day.svg' },
    { name: 'Sfax', img: '/src/assets/sunny.svg' },
    { name: 'Monastir', img: '/src/assets/thunderstorms-day.svg' },
    { name: 'Tozeur', img: '/src/assets/sunny.svg' },
    { name: 'Mahdia', img: '/src/assets/partly-cloudy-day-fog.svg' },
    { name: 'Nabeul', img: '/src/assets/sunny.svg' }
  ];

  const getTemperatureData = (cityName: string) => {
    const { data: dailyTemperatureData } = useQuery({
      queryKey: ['daily_temperature', cityName],
      queryFn: () => fetchdailyTemperature(cityName),
    });

    const { data: dailyminTemperatureData } = useQuery({
      queryKey: ['daily_min_temperature', cityName],
      queryFn: () => fetchdailyminTemperature(cityName),
    });

    const maxTemperature = dailyTemperatureData && dailyTemperatureData.length >= 2 ? dailyTemperatureData[0]._value.toFixed(0) : null;
    const minTemperature = dailyminTemperatureData && dailyminTemperatureData.length >= 2 ? dailyminTemperatureData[0]._value.toFixed(0) : null;

    return { maxTemperature, minTemperature };
  };

  return (
    <Box
      w='810px' h='260px' p="2" as={motion.div}
      initial={{ x: "50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Text fontSize="25" fontStyle={'bold'} color={useColorModeValue('black', 'white')} mt={"3"}>Main Cities</Text>
      <Wrap spacing='10px' justify='center'>
        {cities.map((city) => {
          const { maxTemperature, minTemperature } = getTemperatureData(city.name);
          return (
            <WrapItem p="2" key={city.name}>
              <Flex w='200px' h='80px' bgGradient='linear(to-b, #191B1F,#22465F,#3B97AF)' borderRadius='10px'
                flexDirection="row" alignItems="center" p="2" justifyContent="space-between" m="1"
              >
                <Flex flexDirection="column" display="flex" justifyContent="space-between" m="1">
                  <Text fontSize="25" fontStyle={'bold'} color={useColorModeValue('white', 'white')}>{city.name}</Text>
                  <Flex flexDirection="row" gap="2">
                    <Text fontSize="25" fontStyle={'bold'} color={useColorModeValue('white', 'white')}>{maxTemperature}° </Text>
                    <Text fontSize="25" fontStyle={'bold'} color={useColorModeValue('RGBA(255, 255, 255, 0.64)', 'RGBA(255, 255, 255,0.64)')}>{minTemperature}° </Text>
                  </Flex>
                </Flex>
                <Image src={city.img} alt={city.name} boxSize='70px' />
              </Flex>
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
}
