import {
  ListIcon,
  Link as LinkChakra,
  Heading,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
type ItemType = {
  type: string;
  label: string;
  icon?: React.ElementType;
  path?: string;
};
import {motion} from 'framer-motion'


export const SideItem = ({ item, collapse }: { item: ItemType, isActive: boolean, collapse: boolean }) => {
  const { label } = item;
  if (item.type === "link") {
    const { icon, path } = item;
    return (
      <Box display="flex" alignItems="center" my={12} justifyContent="center" mt="3">
        
        <LinkChakra
          href={path}
          as={Link}
          gap={5}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none", color: "gray" }}
          fontWeight="medium"
          color={useColorModeValue('#111015', 'white')}
          w="full"
          justifyContent={!collapse ? "center" : ""}
        
        
        >
          <ListIcon as={icon} fontSize={28} m="0" />
          {collapse && <Text>{label}</Text>}

        </LinkChakra>
      </Box>
    )
  }
  return (
    <Heading
      color="gray.400"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      pt={collapse ? 8 : 0}
      my={5}
      as={motion.div}
      initial={{x: "-50em",opacity:0}}
      animate={{x: "0",opacity:1}}
    >
      <Text display={collapse ? "flex" : "none"}>{label}</Text>
    </Heading>
  );
}