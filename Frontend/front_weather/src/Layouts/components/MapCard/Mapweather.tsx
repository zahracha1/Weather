import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
const Mapweather = () => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      as={motion.div}
      initial={{ x: "50px", opacity: 0 }}
      animate={{ x: "0", opacity: 1, transition: { duration: 1 } }}
    >
      <iframe
        width="920px"
        height="280px"
        border-radius="20px"
        src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=clouds&product=ecmwf&level=surface&lat=34.317&lon=8.481&message=true"
        frameBorder="0"
      ></iframe>
    </Box>
  );
};
export default Mapweather;
