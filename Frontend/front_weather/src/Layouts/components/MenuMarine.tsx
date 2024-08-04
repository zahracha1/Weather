import { Flex, HStack } from "@chakra-ui/react";
import { Airquality } from "./Cardair/Airquality";
import { CardMarin } from "./Marineforcast/CardMarin";
import Charttemperaturesol from "./Charttempsol/charttemperaturesol";

export const MenuMarine = () => {
  return (
    <Flex
      justifyContent="space-between"
      flexDirection="row"
      h={"100%"}
      w="100%"
      ml={"1rem"}
    >
      <Airquality  />
      <HStack
        flexDirection="column"
        justifyContent="space-around"
        w="65%"
        h="100%"
        gap={'5'}
      >
        <CardMarin />
        <Charttemperaturesol />
      </HStack>
    </Flex>
  );
};
