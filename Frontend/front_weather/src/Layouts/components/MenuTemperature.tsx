import { Flex} from "@chakra-ui/react";
import { Cardtemperature } from "./Cardtemperature.jsx/Cardtemperature";

import { Maincites } from "./Maincites/Maincites";
import Chartstemperature from "./Chartstemperature/Chartstemperature";

export const MenuTemperature = () => (
  <Flex justifyContent="space-around" alignItems={"center"} flexDirection="row" w="100rem" h="43rem" m={"2"} >
    <Cardtemperature />
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="1rem"
    >
      <Chartstemperature />
      <Maincites />
    </Flex>
  </Flex>
);
