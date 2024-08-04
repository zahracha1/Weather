import { List, ListItem } from "@chakra-ui/react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbTemperature } from "react-icons/tb";
import { MdOutlineCalendarMonth, MdOutlineSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SideItem } from "./SideItem";
import { BsCloudHail ,BsWind} from "react-icons/bs";
import {motion} from 'framer-motion'

const items = [
    {
        type: "link",
        label: "Dashboard",
        icon: MdOutlineSpaceDashboard,
        path: "/Home",
    },
    {
        type: "link",
        label: "Temperature",
        icon: TbTemperature,
        path: "/Temperature",
    },
    {
        type: "link",
        label: "Precipitation",
        icon:BsCloudHail,
        path: "/Precipitation",
    },

    {
        type: "link",
        label: "Wind speed",
        icon: BsWind,
        path: "/Windspeed",
    },
    {
        type: "link",
        label: "Air and Marine",
        icon: MdOutlineCalendarMonth,
        path: "/Details",
    },
   
    {
        type: "link",
        label: "Settings",
        icon: MdOutlineSettings,
        path: "/Settings",
    },
];

const Navigation = ({ collapse }: { collapse: boolean }) => {
    const navigate = useNavigate(); // Adding useNavigate hook to handle navigation

    return (
        <List as={motion.div}
        initial={{x: "-80em",opacity:0}}
        animate={{x: "0",opacity:1}}>
            {items.map((item, index) => (
                <ListItem key={index} onClick={() => navigate(item.path)}>
                    <SideItem item={item} isActive={index === 0} collapse={collapse} />
                </ListItem>
            ))}
        </List>
    );
};

export default Navigation;
