import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import Navigation from "./Navigation/Index";
import { Logo } from "./Navigation/Logo";
import { SwitchButtons } from "./Navigation/SwitchButtons";
import { FlexStyle } from "../../Modules/Home/styles/homeStyle.ts";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

export const Sidebar = () => {
    const [collapse, setCollapse] = useState(false);
    return (
        <Flex
            as="aside"
            {...FlexStyle}
            h="107vh"
            minH={'107vh'}
            maxW={collapse ? '200px' : '100px'}
            bg={useColorModeValue('rgba(201, 203, 207, 0.3)', '#111015')}
        >
            <Box height={'100%'}>
                <IconButton
                    aria-label="Menu Colapse"
                    m="3"
                    icon={<MdMenu />}
                    size="sm"
                    onClick={() => setCollapse(!collapse)}
                />
                <Logo collapse={collapse} />
                <Navigation collapse={collapse} />
            </Box>
            <SwitchButtons />
        </Flex>

    );
}
