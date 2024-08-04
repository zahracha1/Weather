import { Box, Heading, Text, Image, Flex, useColorModeValue } from "@chakra-ui/react";
import { fetchdailywind } from "../../../Services/Windspeed/Winddailyservices";
import { useQuery } from 'react-query';
import { format, addDays } from 'date-fns';
import { useState, useEffect } from 'react';

import useSelectedCity from "../../../react-query/selectedCity";
import { motion } from 'framer-motion';

const imageumbrella = [
  '/src/assets/wind.svg',
  '/src/assets/tornado.svg',
  '/src/assets/mist.svg',
  '/src/assets/dust-wind.svg',
  '/src/assets/tornado.svg',
  '/src/assets/wind.svg',
  '/src/assets/tornado.svg',
  '/src/assets/mist.svg',
  '/src/assets/dust-wind.svg',
  '/src/assets/wind.svg',
  '/src/assets/mist.svg',
];

export const Cardwind = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();

  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, []);

  useEffect(() => {
    refetcMeandailywind();
  }, [selectedCity]);

  const [] = useState<boolean>(false);

  const [, setStartDate] = useState<string>('');
  const [, setEndDate] = useState<string>('');


  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    setStartDate(format(today, 'yyyy-MM-dd'));
    setEndDate(format(nextWeek, 'yyyy-MM-dd'));
  }, []);

  const { data: dailywindData, refetch: refetcMeandailywind } = useQuery({
    queryKey: ['daily_wind', selectedCity],
    queryFn: () => fetchdailywind(selectedCity),
  });

  const firstwind = dailywindData && dailywindData.length >= 2 ? dailywindData[0]._value.toFixed(1) : null;
  const firsttime = dailywindData && dailywindData.length >= 2 ? dailywindData[0]._time : null;
  return (
    <Box
      bgGradient="linear(to-b, #191B1F,#22465F,#3B97AF)"
      w="33%" h="45rem"
      borderRadius="10px" as={motion.div}
      initial={{ x: "-50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Heading size="md" textAlign="center" my={5} mt="12"  color={useColorModeValue('white', 'white')}>
        Wind speed direction
      </Heading>
      <Box w="94%" h="20" bg="#1B1B1D" ml="3" borderRadius='10px' alignContent="space-between" >
                <Flex alignItems="start" flexDirection="row" justifyContent="space-between" m="3"  >
                    <Flex alignItems="start" flexDirection="row" gap={"2"}  >
                        <Flex alignItems="start" flexDirection="column"  >
                            <Text fontSize={"20px"}  fontStyle={'bold'} color={useColorModeValue('white', 'white')} >This week</Text>
                            <Text fontSize={"20px"} fontStyle={'bold'} color={useColorModeValue('white', 'white')}>{firsttime}</Text>
                        </Flex>
                    </Flex>
                    <Image src='\src\assets\windsock.svg' alt='sunny' boxSize='65px' />
                    <Flex alignItems="start" flexDirection="row" m="0" >
                        <Flex alignItems="start" flexDirection="column"  >
                            <Text fontSize={"20px"} fontStyle={'bold'} color={useColorModeValue('white', 'white')} >wind speed</Text>          
                            <Text fontSize={"20px"} fontStyle={'bold'} color={useColorModeValue('white', 'white')}>{firstwind} KM/H</Text>
                        </Flex>
                      
                    </Flex>
                </Flex>
            </Box>



      {dailywindData?.slice(0, 7).map((windData:any, index: number) => (
        <Box
          key={index}
          w="94%" h="9%" bg="#1B1B1D" borderRadius="10px" m="3" p="1"
          as={motion.div}
          initial={{ x: "-50px", opacity: 0 }}
          animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
        >
          <Flex alignItems="center" flexDirection="row" justifyContent="space-between" m="2">
            <Text fontSize="22px" fontStyle="bold" color={useColorModeValue('white', 'white')}>
              {windData._time}
            </Text>
            <Text fontSize="22px" fontStyle="bold" color={useColorModeValue('white', 'white')}>
              {windData._value.toFixed(1)} KM/H
            </Text>
            <Image src={imageumbrella[index]} alt='weather-icon' boxSize="48px" />
          </Flex>
        </Box>
      ))}
     
    </Box>
  );
};
