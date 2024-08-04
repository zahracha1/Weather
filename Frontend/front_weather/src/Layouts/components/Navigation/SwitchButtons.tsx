import { useColorMode, useColorModeValue,Flex, IconButton } from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export const SwitchButtons = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex>
      <IconButton
        size="md"
        alignSelf="center"
        onClick={toggleColorMode}
        backgroundColor={useColorModeValue("white", "gray.700")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        border={"1px"}
        aria-label="Toggle Color Mode"
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        borderRadius="full"
        variant="ghost"
        fontSize={20}
        p={4}
      />
      
    </Flex>
  );
}
