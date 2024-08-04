import { Text, Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { GiWaveSurfer, GiBigWave, GiWaveCrest } from "react-icons/gi";
import { useQuery } from "react-query";
import { format, addDays } from "date-fns";
import { useState, useEffect } from "react";
import { fetchdailywaveheight } from "../../../Services/Marine/Waveheightservices";
import { fetchdailywavedirection } from "../../../Services/Marine/Wavedirectionservices";
import { fetchdailywaveperiod } from "../../../Services/Marine/Waveperiodservices";
import { motion } from "framer-motion";
//import useSelectedCity from "../../../react-query/selectedCity";

export const CardMarin = () => {

  const cityName = "Sousse";
  
  
  const [, setStartDate] = useState<string>("");
  const [, setEndDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);
    setStartDate(format(today, "yyyy-MM-dd"));
    setEndDate(format(nextWeek, "yyyy-MM-dd"));
  }, []);

  const { data: dailywaveheight} = useQuery({
    queryKey: ["dailywaveheight", cityName],
    queryFn: () => fetchdailywaveheight(cityName),
  });

  const { data: dailywavedirection  } = useQuery({
    queryKey: ["dailywavedirection", cityName],
    queryFn: () => fetchdailywavedirection(cityName),
  });

  const { data: dailywaveperiod } = useQuery({
    queryKey: ["dailywaveperiod",  cityName],
    queryFn: () => fetchdailywaveperiod( cityName),
  });

  const waveperiod = dailywaveperiod
    ? dailywaveperiod[0]._value.toFixed(1)
    : null;
  const wavedirection = dailywavedirection
    ? dailywavedirection[0]._value.toFixed(1)
    : null;
  const waveheight = dailywaveheight
    ? dailywaveheight[0]._value.toFixed(1)
    : null;

  const marineData = [
    {
      label: "Wave Height",
      value: `${waveheight} M`,
      icon: GiWaveSurfer
    },
    {
      label: "Wave Direction",
      value: `${wavedirection} °`,
      icon: GiBigWave
    },
    {
      label: "Wave Period",
      value: `${waveperiod} S`,
      icon: GiWaveCrest
    }
  ];

  return (
    <>
      <Box
        bgGradient="linear(to-b, #191B1F,#22465F,#3B97AF)"
        w="98%"
        h="19rem"
        padding={"1rem"}
        borderRadius="10px"
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        as={motion.div}
        initial={{ x: "50px", opacity: 0 }}
        animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={"3rem"}
          w="100%"
          m={"2"}
          as={motion.div}
          initial={{ y: "-50px", opacity: 0 }}
          animate={{ y: "0", opacity: 1, transition: { duration: 1 } }}
        >
          {marineData.map((data, index) => (
            <Box
              key={index}
              w="24%"
              h="90%"
              bg={"rgba(255, 255, 255, 0.26)"}
              borderRadius="10px"
              ml={index !== 0 ? "1" : "0"}
            >
              <Flex
                alignItems="center"
                flexDirection="column"
                justifyContent="space-between"
                m="5"
              >
                <Text fontSize={"20"} p={"2"}  color={useColorModeValue('white', 'white')}>
                  {data.label}
                </Text>
                <Icon p={"2"} as={data.icon} boxSize={"28"} />
                <Text fontSize={"20"} p={"2"}  color={useColorModeValue('white', 'white')}>
                  {data.value}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};
