import { Box, Text, Flex, Image, Divider, useColorModeValue, Progress, Stack } from '@chakra-ui/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { fetchTemperature } from '../../../Services/Temperature/Temperatureservices';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { useQuery } from 'react-query';
import { fetchprobhourlyPrecipitation } from '../../../Services/Precipitation/Probhourlypreciservices';
import { motion } from "framer-motion";
import useSelectedCity from '../../../react-query/selectedCity';

export const Detailsprecipitation = () => {
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
    refetchprobhourlyPrecipitation();
  }, [selectedCity]);
  const [] = useState<boolean>(false);


  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today,7 );

    setStartDate(format(today, 'yyyy-MM-dd'));
    setEndDate(format(nextWeek, 'yyyy-MM-dd'));
  }, []);

  const { data,refetch: refetchTemperature  } = useQuery({
    queryKey: ['temperature', selectedCity, startDate, endDate],
    queryFn: () => fetchTemperature(selectedCity, "startDate", "endDate")
  });

   const { data:dataprobpreci ,refetch:refetchprobhourlyPrecipitation} = useQuery({
    queryKey: ['probpreci', selectedCity, startDate, endDate],
    queryFn: () =>  fetchprobhourlyPrecipitation(selectedCity, startDate, endDate)
  });

  const fetchprobprecidaily = dataprobpreci? dataprobpreci.slice(5, 27).map((probpreci: { _value: number; }) => probpreci._value.toFixed(0)) : [];

  const hourlyTemperatures = data ? data.slice(5, 27).map((temp: { _value: number; }) => temp._value.toFixed(1)) : [];

    const hours = [
      "05h00 -> 06h00",
      "07h00 -> 08h00",
      "09h00 -> 10h00",
      "11h00 -> 12h00",
      "13h00 -> 14h00",
      "15h00 -> 16h00",
      "17h00 -> 18h00",
      "19h00 -> 20h00",
      "21h00 -> 22h00",
      "23h00 -> 00h00",
      "01h00 -> 02h00"
      ];
    
      const imageSources = [
        '/src/assets/partly-cloudy-night-smoke.svg',
        '/src/assets/partly-cloudy-night.svg',
        '/src/assets/overcast-day.svg',
        '/src/assets/overcast-day.svg',
        '/src/assets/overcast-day.svg',
        '/src/assets/partly-cloudy-day-sleet.svg',
        '/src/assets/partly-cloudy-day-sleet.svg',
        '/src/assets/overcast.svg',
        '/src/assets/overcast-night.svg',
        '/src/assets/partly-cloudy-night-sleet.svg',
        '/src/assets/partly-cloudy-night.svg'
      ];
    
      const progressValues = [90, 30, 30, 50, 60, 2, 50, 80, 60, 15, 15];
    
      const imageumbrella = [
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
        '/src/assets/umbrella.svg',
      ];


      const imageumbrella1 = [
        '/src/assets/raindrop.svg',
        '/src/assets/raindrop.svg',
        '/src/assets/raindrop.svg',
        '/src/assets/raindrop.svg',
         '/src/assets/raindrop.svg',
         '/src/assets/raindrops.svg',
         '/src/assets/raindrops.svg',
         '/src/assets/raindrop.svg',
         '/src/assets/raindrop.svg',
         '/src/assets/raindrop.svg',
         '/src/assets/raindrop.svg',
      ];

      return (
        <Box w="85%" h="78vh" 
          bg='#21222D' borderRadius='10px' m="1"   as={motion.div}
          initial={{x: "50px",opacity:0}}
          animate={{x: "0",opacity:1,transition: { duration: 1 }}}> 
          <Flex flexDirection="row"
           justifyContent="space-between" m="8">
            <Flex flexDirection="column" >
              <Stack spacing={6} >
                {hours.map((hour, index) => (
                  <Text key={index} fontSize="22" color={useColorModeValue('white', 'white')}>
                    {hour}
                  </Text>
                ))}
              </Stack>
            </Flex>
    
            <Flex flexDirection="column" gap="4">
              {imageSources.map((src, index) => (
                <Image key={index} src={src} alt="weather" boxSize="40px" />
              ))}
            </Flex>
    
            <Flex flexDirection="column">
              <Divider bg="#3DAAC0" borderWidth="2px" w="100" h="99%" />
            </Flex>
    
            <Flex flexDirection="column" gap="6">
        {hourlyTemperatures.map((temperature:string, index:number) => {
    // Check if the index is even (0, 2, 4, ...)
           if (index % 2 === 0) {
             return (
            <Text key={index} fontSize="22" color={useColorModeValue('RGBA(255, 255, 255, 0.48)', 'RGBA(255, 255, 255, 0.48)')}>
                {temperature}°
            </Text>
        );
    }         else {
        // If index is odd, return null to skip this temperature
         return null;
    }
})}
        </Flex>
    
            <Flex flexDirection="column" w="30%" >
              <Stack spacing={12} p="2">
                {progressValues.map((value, index) => (
                  <Progress key={index} bgGradient='linear(to-b, #CDCF5C,#EF8835)' height='10px' value={value} />
                ))}
              </Stack>
            </Flex>
    
            <Flex flexDirection="column" gap="6">
        {hourlyTemperatures.map((temperature: string, index: number) => {
    // *zahra charana*: Check if the index is odd (1, 3, 5, ...) 
         if (index % 2 !== 0) {
          return (
            <Text key={index} fontSize="22" color={useColorModeValue('RGBA(255, 255, 255, 0.48)', 'RGBA(255, 255, 255, 0.48)')}>
                {temperature}°
            </Text>
        );
    }     else {
        // *zahra charana*: If index is even, return null to skip this temperature
          return null;
    }
})}
        </Flex>
    
            <Flex flexDirection="column">
              <Divider bg="#3DAAC0" borderWidth="2px" w="100" h="99%" />
    
            </Flex>
    
            <Flex flexDirection="column" gap="4">
              {imageumbrella.map((src, index) => (
                <Image key={index} src={src} alt="weather" boxSize="40px" />
              ))}
            </Flex>
            <Flex flexDirection="column" gap="4">
              {imageumbrella1.map((src, index) => (
                <Image key={index} src={src} alt="weather" boxSize="40px" />
              ))}
            </Flex>

            <Flex flexDirection="column" gap="6">
        {fetchprobprecidaily.map((probpreci:string, index:number) => {
    // Check if the index is even (0, 2, 4, ...)
           if (index % 2 === 0) {
             return (
            <Text key={index} fontSize="22" color={useColorModeValue('white', 'white')}>
                {probpreci} %
            </Text>
        );
    }         else {
        // If index is odd, return null to skip this temperature
         return null;
    }
})}
        </Flex>
          </Flex>
        </Box>
      )
    }
    

//