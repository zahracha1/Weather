import { Box, Flex, Text, useColorModeValue, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container, IconButton } from '@chakra-ui/react';
import { useQuery } from "react-query";
import { fetchdailyprobPrecipitation } from "../../../Services/Precipitation/Probprecipitationservices";
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import useSelectedCity from "../../../react-query/selectedCity";
import { motion } from "framer-motion";

interface PrecipitationData {
  _value: number;
  _time: string;
}

export const Daysprecipitation = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();

  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, []);

  useEffect(() => {
    refetchdailyprobPrecipitation();
  }, [selectedCity]);

  const [, setStartDate] = useState<string>('');
  const [, setEndDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    setStartDate(format(today, 'yyyy-MM-dd'));
    setEndDate(format(nextWeek, 'yyyy-MM-dd'));
  }, []);

  const { data: dailyprobprecipitationeData, refetch: refetchdailyprobPrecipitation } = useQuery({
    queryKey: ['daily_temperature', selectedCity],
    queryFn: () => fetchdailyprobPrecipitation(selectedCity),
  });

  // Ensure dailyprobprecipitationeData is defined and has the expected structure before mapping
  const precipitationData: PrecipitationData[] = dailyprobprecipitationeData? dailyprobprecipitationeData.slice(0, 7).map((data: any) => ({
    _value: data._value.toFixed(0),
    _time: data._time
  })) : [];

  return (
    <Box
      bgGradient='linear(to-b, #191B1F,#22465F,#3B97AF)'
      w='65%'
      h='230px'
      padding={"1rem"}
      borderRadius='10px'
      display="flex"
      flexDirection="row"
      justifyContent={"space-between"}
      alignSelf={'center'}
      as={motion.div}
      initial={{ y: "50px", opacity: 0 }}
      animate={{ y: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Container maxW="container.xl">
        <Flex flexDirection='row' justifyItems="flex-start" justifyContent="start" gap={'3rem'} position={'relative'}>
          <Box className="slider-controler" padding={"1rem"}>
            <IconButton
              className="swiper-button-prev slider-arrow"
              aria-label="Next Slide"
              bottom="110"
              position={'absolute'}
              left='-5rem'
              bgColor="transparent"
              top="50%"
              transform="translate(-50%, 50%)"
              _hover={{ bgColor: 'transparent' }}
            />
            <IconButton
              className="swiper-button-next slider-arrow"
              aria-label="Previous Slide"
              position={'absolute'}
              top="50%"
              right="-5rem"
              transform="translate(0, 50%)"
              bgColor="transparent"
              _hover={{ bgColor: 'transparent' }}
            />
            <Box className="swiper-pagination" />
          </Box>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={false}
            loop={true}
            slidesPerView={4}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            className="swiper_container"
          >
            {precipitationData.map((data, index) => (
              <SwiperSlide key={index}>
                <Flex flexDirection='column' justifyItems="flex-start" justifyContent="start" gap={'1rem'}>
                  <Text fontSize={25} fontStyle={'bold'} color={useColorModeValue('white', 'white')}>{data._time}</Text>
                  <Image src='\src\assets\partly-cloudy-day-smoke.svg' alt='sunny' boxSize='80px' />
                  <Text fontSize={35} fontStyle={'bold'} color={useColorModeValue('white', 'white')}>{data._value}%</Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Container>
    </Box>
  );
};