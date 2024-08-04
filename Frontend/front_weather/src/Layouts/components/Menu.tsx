import { Flex} from "@chakra-ui/react";
import { FCard } from "./FirstCrad/FCrad";
import { SCard } from "./SecondCard/SCard";
import { DaysCard } from "./DaysCard/DaysCard";
import Mapweather from "./MapCard/Mapweather";

export const Menu = () => (
  <Flex
    flexDirection="column"
    h={"100%"}
    w="100%"
    p={5}
    justifyContent={"space-between"}
  >
    <Flex justifyContent="space-around" w="100%" ml={"1rem"}>
      <FCard />
      <SCard />
    </Flex>
    <Flex justifyContent="space-around" alignItems={"end"} w={"100%"} mt={'5rem'} >
      <DaysCard />
      <Mapweather />
    </Flex>
  </Flex>
);
