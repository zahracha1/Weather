import React, { useEffect } from "react";
import { Sidebar } from "./components/Sidebar.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { HStack, VStack } from "@chakra-ui/react";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(window.location.pathname === '/') {
      navigate('/Home');
    }
  }, [])

  return (
    <>
      <HStack w="full" h="100%" bg="gray.100" padding={7}>
        <Sidebar />
        <VStack w="full" minH={'107vh'} maxH={'107vh'}> 
            <Outlet />
        </VStack>
      </HStack>
    </>
  );
};

export default Layout;
