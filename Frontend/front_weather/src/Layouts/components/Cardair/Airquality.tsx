import {
  Center,
  Flex,
  Wrap,
  WrapItem,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  useColorModeValue,
} from "@chakra-ui/react";
import { fetchdailytempsol } from "../../../Services/Temperature/Temperaturesolservices";
import { fetchdailyuvindex } from "../../../Services/Airquality/Uvindexservices";
import { fetchdailydust } from "../../../Services/Airquality/Dustservices";
import { fetchdailycarbononoxide } from "../../../Services/Airquality/Carbonmonoxideservices";
import { fetchdailypm } from "../../../Services/Airquality/Pmservice";
import { fetchdailyozone } from "../../../Services/Airquality/Ozoneservices";
import { fetchdailynitrogendioxide } from "../../../Services/Airquality/Nitrogendioxideservices";
import { useQuery } from 'react-query';
import { format, addDays } from 'date-fns';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import useSelectedCity from "../../../react-query/selectedCity";


export const Airquality = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();
  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, []);


  
  const [, setStartDate] = useState<string>('');
const [, setEndDate] = useState<string>('');
useEffect(() => {
  const today = new Date();
  const nextWeek = addDays(today, 7);

  setStartDate(format(today, 'yyyy-MM-dd'));
  setEndDate(format(nextWeek, 'yyyy-MM-dd'));
}, []);



useEffect(() => {
  refetchdailyuvindexData();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailydust();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailypm ();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailyozone  ();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailynitrogendioxide  ();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailyozone ();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailytempsol ();
}, [selectedCity]);
const [] = useState<boolean>(false);

useEffect(() => {
  refetchdailycarbononoxide ();
}, [selectedCity]);
const [] = useState<boolean>(false);

const { refetch:refetchdailyuvindexData} = useQuery({
  queryKey: ['dailyuvindex',selectedCity],
  queryFn: () => fetchdailyuvindex(selectedCity),
});
const { data: dailydust,refetch:refetchdailydust } = useQuery({
  queryKey: ['dailydust', selectedCity],
  queryFn: () => fetchdailydust (selectedCity),
});


const { data: dailypm ,refetch: refetchdailypm} = useQuery({
  queryKey: ['dailypm', selectedCity],
  queryFn: () => fetchdailypm  (selectedCity), 
});





const { data: dailycarbononoxide,refetch: refetchdailycarbononoxide } = useQuery({
  queryKey: ['dailycarbononoxide', selectedCity],
  queryFn: () => fetchdailycarbononoxide (selectedCity), 
});

const { data: dailyozone,refetch:refetchdailyozone } = useQuery({
  queryKey: ['daily_ozone', selectedCity],
  queryFn: () => fetchdailyozone (selectedCity), 
});

const { data: dailynitrogendioxide,refetch:refetchdailynitrogendioxide } = useQuery({
  queryKey: ['daily_nitrogendioxide', selectedCity],
  queryFn: () => fetchdailynitrogendioxide (selectedCity), 
});

const { data: dailytempsol, refetch:  refetchdailytempsol } = useQuery({
  queryKey: ['daily_tempsol', selectedCity],
  queryFn: () => fetchdailytempsol (selectedCity), 
});

const temppsol=dailytempsol ? dailytempsol[0]._value.toFixed(1): null;
const dust= dailydust ? dailydust[0]._value.toFixed(1) : null;
const pm= dailypm ? dailypm[0]._value.toFixed(1) : null;
const carbononoxide= dailycarbononoxide ? dailycarbononoxide[0]._value.toFixed(1) : null;
const ozone= dailyozone ? dailyozone[0]._value.toFixed(1) : null;
const nitrogendioxide= dailynitrogendioxide ? dailynitrogendioxide[20]._value.toFixed(1) : null;

  return (
    <><Text></Text>
    <Flex flexDirection={"column"} as={motion.div}
         initial={{x: "-50px",opacity:0}}
         animate={{x: "0",opacity:1,transition: { duration: 1 }}}>

      <Wrap spacing="40px"  >
        <WrapItem
        >
          <Center w="15rem" h="9rem" borderRadius={"10"} bg="#21222D">
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              m="2"
            >
              <Text fontStyle={"bold"} fontSize={"23"}  color={useColorModeValue('white', 'white')}>
                Soil Tempreture
              </Text>
              <Text fontStyle={"bold"} color={useColorModeValue('white', 'white')}>
                <CircularProgress
                 color={useColorModeValue('rgb(75, 192, 192)', 'rgb(75, 192, 192)')}
                  value={temppsol}
                  size="95px"
                  thickness="5px"
                >
                  {" "}
                  <CircularProgressLabel> {temppsol}°</CircularProgressLabel>
                </CircularProgress>
              </Text>
            </Flex>
          </Center>
        </WrapItem>

        <WrapItem >
          <Center w="15rem" h="9rem" borderRadius={"10"} bg="#21222D">
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              m="2"
            >
              <Text fontStyle={"bold"} fontSize={"30"} color={useColorModeValue('white', 'white')}>
                Dust
              </Text>
              <Text fontStyle={"bold"} color={useColorModeValue('white', 'white')}>
                <CircularProgress
                  value={dust}
                  size="95px"
                  thickness="5px"
                  color={useColorModeValue('rgb(75, 192, 192)', 'rgb(75, 192, 192)')}
                >
                  {" "}
                  <CircularProgressLabel>{dust}</CircularProgressLabel>
                </CircularProgress>
              </Text>
            </Flex>
          </Center>
        </WrapItem>
      </Wrap>

      <Wrap spacing="40px" mt={"22%"}>
        <WrapItem>
          <Center w="15rem" h="9rem" borderRadius={"10"} bg="#21222D">
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              m="1"
              gap={"4"}
            >
              <Text fontStyle={"bold"} fontSize={"21"}  color={useColorModeValue('white', 'white')}>
                Particulate Matter PM25
              </Text>
              <Slider aria-label="slider-ex-1" value={pm} w={"210px"}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontStyle={"bold"} fontSize={"30"}  color={useColorModeValue('white', 'white')}>
                {pm} ug/m<sup>3</sup>
              </Text>
            </Flex>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="15rem" h="9rem" borderRadius={"10"} bg="#21222D">
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              m="1"
              gap={"4"}
            >
              <Text fontStyle={"bold"} fontSize={"21"}  color={useColorModeValue('white', 'white')}>
                Carbon Monoxide CO
              </Text>
              <Slider aria-label="slider-ex-1" value={carbononoxide} w={"210px"}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontStyle={"bold"} fontSize={"30"}  color={useColorModeValue('white', 'white')}>
                {carbononoxide} ug/m<sup>3</sup>
              </Text>
            </Flex>
          </Center>
        </WrapItem>
      </Wrap>

      <Wrap spacing="40px" mt={"22%"}>
        <WrapItem>
          <Center w="15rem" h="9rem" borderRadius={"10"} bg="#21222D">
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              m="1"
              gap={"4"}
            >
              <Text fontStyle={"bold"} fontSize={"30"}  color={useColorModeValue('white', 'white')}>
                Ozone O3
              </Text>
              <Slider aria-label="slider-ex-1" value={ozone} w={"210px"}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontStyle={"bold"} fontSize={"30"}  color={useColorModeValue('white', 'white')}>
                {ozone} ug/m<sup>3</sup>
              </Text>
            </Flex>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w="15rem" h="9rem" borderRadius={"10"} bg="#21222D">
            <Flex
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              m="2"
              gap={"6"}
            >
              <Text fontStyle={"bold"} fontSize={"22"}  color={useColorModeValue('white', 'white')}>
                Nitrogen Dioxide NO2
              </Text>
              <Slider aria-label="slider-ex-1" value={nitrogendioxide} w={"210px"}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text fontStyle={"bold"} fontSize={"30"} color={useColorModeValue('white', 'white')}>
                {nitrogendioxide}ug/m<sup>3</sup>
              </Text>
            </Flex>
          </Center>
        </WrapItem>
      </Wrap>
    </Flex></>
  );
};
