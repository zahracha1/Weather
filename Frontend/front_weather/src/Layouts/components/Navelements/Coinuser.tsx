import {
  Icon,
  HStack,
  Avatar,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Button,
  ModalFooter,
  ModalCloseButton,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useFavoritesList } from "../../../Services/AddFavoritList/Getfavoritcity";
import { AddFavoriteCity } from "../../../Services/AddFavoritList/AddCity";
import { deleteFavorite } from "../../../Services/AddFavoritList/DeleteCity";
import { useKeycloak } from "@react-keycloak/web";


export const Coinuser: React.FC = () => {
  const { keycloak } = useKeycloak();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [favorites, setFavorites] = useState<string[] | undefined>(undefined);
  const toast = useToast();

  const { data, refetch } = useFavoritesList();

  useEffect(() => {
    console.log('data == ',data);
    
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  useEffect(() => {
    if (data) {
      setFavorites(data);
    }
  }, [data]);

 /* const handleLogout = () => {
    window.location.href = "http://localhost:5173";
    console.log("Logout clicked");
  };*/

  const handleLogout = () => {
    keycloak.logout({ redirectUri: 'http://localhost:5173' }); 
    console.log("Logout clicked");
  };

  const handleAddFavorite = async (city: string) => {
    try {
      const result = await AddFavoriteCity(city);
      console.log(`City ${city} added to favorites`, result);
      refetch(); // Refetch the favorites list after adding a city
    } catch (error) {
      console.error('Failed to add favorite city', error);
    }
  };

  const handleDeleteFavorite = async (city: string) => {
    try {
      const result = await deleteFavorite(city);
      console.log(`City ${city} removed from favorites`, result);
      toast({
        title: 'City removed from favorites.',
        description: `${city} has been removed from your favorite list.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      refetch(); // Refetch the favorites list after deleting a city
    } catch (error) {
      console.error('Failed to delete favorite city', error);
      toast({
        title: 'Failed to remove city from favorites.',
        description: 'There was an error removing the city from your favorite list.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Flex flexDirection="row">
      <HStack spacing="2">
        <Icon as={FaRegStar} w={7} h={8} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <motion.div
            transition={{ exit: { delay: 1 }, enter: { duration: 0.5 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <ModalHeader>Favorite List</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDirection={"column"} gap="5">
                  
                  {favorites && favorites.map((city: string, index) => (
                    <React.Fragment key={index}>
                      <Flex flexDirection={"row"} justifyContent={"space-between"}>
                        <Text>{city}</Text>
                        <Flex flexDirection={"row"} gap={"2"}>
                          <Icon as={FaStar} w={7} h={8} onClick={() => handleAddFavorite(city)} />
                          <Icon as={IoTrashOutline} w={7} h={8} onClick={() => handleDeleteFavorite(city)} />
                        </Flex>
                      </Flex>
                      <Flex flexDirection="column">
                        <Divider bg="#3DAAC0" borderWidth="2px" w="100" h="99%" />
                      </Flex>
                    </React.Fragment>
                  ))}
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </motion.div>
        </Modal>
        <Icon as={IoMdNotificationsOutline} w={7} h={8} />
        <Menu>
          <MenuButton as={Avatar} name="User" src="\src\assets\ZAHRA.jpg" size="md" />
          <MenuList>
            <MenuItem onClick={handleLogout}>
              <Icon as={MdExitToApp} mr="2" />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
