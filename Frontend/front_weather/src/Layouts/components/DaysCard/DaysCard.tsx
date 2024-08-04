import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Image,
  Container,
  IconButton,
} from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { fetchdailyTemperature } from "../../../Services/Temperature/Temperatureservicesdaily";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import useSelectedCity from "../../../react-query/selectedCity";
import { useEffect, useState } from "react";

export const DaysCard = () => {
  //const cityName = "Sousse";
  const { selectedCity, setSelectedCity } = useSelectedCity();
  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, []);

  useEffect(() => {
    refetchdailyTemperature();
  }, [selectedCity]);
  const [] = useState<boolean>(false);
  
  // Fetch daily temperature data using useQuery hook
  const { data: dailyTemperatureData ,refetch:refetchdailyTemperature} = useQuery({




    
    queryKey: ["daily_temperature", selectedCity],
    queryFn: () => fetchdailyTemperature(selectedCity),
  });

  return (
    <HStack
      flexDirection="column"
      w="390px"
      alignItems="start"
      justifyContent={"start"}
      as={motion.div}
      initial={{ x: "-50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <Text
        fontSize={20}
     
        color={useColorModeValue('black', 'white')}
        mt="1"
      >
        Weekly Forecast
      </Text>
      <Box
        bgGradient="linear(to-b, #191B1F,#22465F,#3B97AF)"
        w="390px"
        h="100%"
        padding={"2rem"}
        display={"flex"}
        alignItems="start"
        borderRadius="xl"
        justifyContent={"space-between"}
      >
        <Container maxW="container.xl">
          <Box className="slider-controler" position="relative">
            <IconButton
              className="swiper-button-next slider-arrow"
              aria-label="Next Slide"
              mr="-5"
              position="absolute"
              transform="translateY(250%)"
              bgColor="transparent"
              _hover={{ bgColor: "transparent" }}
            />
            <Box className="swiper-pagination" />
          </Box>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={false}
            loop={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
            }}
            modules={[Pagination, Navigation]}
            className="swiper_container"
          >
            {dailyTemperatureData?.map((element: any, index: number) => (
              <SwiperSlide key={index}>
                <Flex
                  flexDirection="column"
                  justifyItems="flex-start"
                  justifyContent="start"
                  gap={"3rem"}
                  as={motion.div}
                  initial={{ y: "-70px", opacity: 0 }}
                  animate={{ y: "0", opacity: 1, transition: { duration: 1 } }}
                >
                  <Text
                    fontSize={25}
                    
                    color={useColorModeValue("white", "white")}
                  >
                    {element.days}
                  </Text>
                  <Image src="/src/assets/day.svg" alt="sunny" boxSize="50px" />
                  <Text
                    fontSize={20}
                    
                    color={useColorModeValue("white", "white")}
                  >
                    {element._value}°
                  </Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>
    </HStack>
  );
};
