import { Box, Text, Flex, Divider, MenuList, MenuItem, Menu, MenuButton, Icon, useColorModeValue, Button } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa';
import { MdOutlineSettings } from "react-icons/md";
import { motion } from "framer-motion";
const Contenusettings = () => {
    return (
        <Box
            bg='#21222D' w='68%' h='18rem'
            padding={"1rem"} borderRadius='10px'
            display="flex" flexDirection="row" justifyContent={"space-between"} m="9" as={motion.div}
            initial={{x: "50px",opacity:0}}
            animate={{x: "0",opacity:1,transition: { duration: 1 }}}>
            <Flex flexDirection='column' justifyContent="space-between"  >
                <Flex flexDirection="row" justifyContent={"space-between"} >
                    <Text fontSize="25" color={useColorModeValue('white', 'white')}>Settings</Text>
                    <Icon as={MdOutlineSettings} w={7} h={8} color={useColorModeValue('white', 'white')} />
                </Flex>
                <Flex flexDirection='row'>
                    <Divider bg="#3DAAC0" borderWidth="2px" w="65rem" h="2%" m="1" />
                </Flex>

                <Flex flexDirection='row' justifyContent={"space-between"}>
                    <Text fontSize="25" color={useColorModeValue('white', 'white')}>Language</Text>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown />}>English</MenuButton>
                        <MenuList>
                            <MenuItem>Arabe</MenuItem>
                            <MenuItem>Français</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Flex flexDirection='row'>
                    <Divider bg="#3DAAC0" borderWidth="2px" w="65rem" h="2%" m="1" />
                </Flex>

                <Flex flexDirection='row' justifyContent={"space-between"}>
                    <Text fontSize="25" color={useColorModeValue('white', 'white')}>Units</Text>
                    <Menu isLazy >
                        <MenuButton as={Button} rightIcon={<FaChevronDown />}>  Units</MenuButton>
                        <MenuList>
                            <MenuItem>Imperial (°F, Mph, In)</MenuItem>
                            <MenuItem>Metric (°C, Km/H, Mm)</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

            </Flex>
        </Box>
    )
}

export default Contenusettings


