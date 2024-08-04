/*import { Text, Box, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import axios from "axios";
import React, { useEffect } from "react";
const Publicdash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloak = new Keycloak({
        url: "http://localhost:8080/auth",
        realm: "weather",
        clientId: "myclient",
      });

      console.log("Initializing Keycloak...");

      try {
        await keycloak.init({ onLoad: "login-required" });
        console.log("User is authenticated:", keycloak.authenticated);
        navigate("/Home"); // Redirect to Home after successful authentication
      } catch (error) {
        console.error("Authentication failed:", error);
      }

      // Event listener for login success
      keycloak.onAuthSuccess = () => {
        console.log("Login successful");
        navigate("/Home"); // Redirect to Home after successful authentication
      };

      // Event listener for login failure
      keycloak.onAuthError = (errorData) => {
        console.error("Login error:", errorData);
        // Handle login error (e.g., show error message, redirect to login page)
      };
    };

    initKeycloak();
  }, []); // Only run once on component mount

  return (
    <Flex w="90vw" h="90vh" align="center" justify="center">
      <form action="/weather/api/auth" method="get">
        <Button
          bg="linear-gradient(135deg, #8EC5FC 0%, #C9A1F9  100%)"  
          type="submit"
          size="lg"
          height='10rem'
          width='200%'
          _hover={{ bg: "linear-gradient(135deg, #6BA1F9 0%, #C9A1F9 100%)" }}
          border='2px'
  borderColor= '#3DAAC0'
        >
          login
        </Button>
      </form>{" "}
    </Flex>
  );
};

export default Publicdash;
*/

import { Box, Button } from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";
import {} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LampContainer} from "../components/Lampecomponent";
import { useKeycloak } from "@react-keycloak/web";
//import { useAuth } from "../../routes/useauth";
//import KeycloakInstance from "../../Keycloak/Keycloak";

const MotionBox = motion(Box);

const Login: React.FC = () => {
  const { keycloak } = useKeycloak()
 // const { setStatus } = useAuth();

/*   useEffect(() => {
    async function handleCallback() {
      const code = new URLSearchParams(location.search).get('code');
      console.log("code = ",code)
      if (code) {
        try {
          const tokenResponse = await exchangeCodeForTokens(code);
          const accessToken = tokenResponse.access_token;
          // Store the access token securely and use it for authentication
          // Redirect or navigate to the desired route in your application
        } catch (error) {
          console.error('Failed to exchange code for tokens:', error);
          // Handle error appropriately (e.g., show error message to the user)
        }
      } else {
        console.error('No code found in callback URL');
        // Handle error appropriately (e.g., show error message to the user)
      }
    }
  
    handleCallback();

    console.log("loc = 0",document?.defaultView?.location);
    
    if (document?.defaultView?.location?.href.includes("session_state")) {
      //setStatus("authenticated");
    }
  }, []); */


  const handleClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //console.log("zahra");

    console.log("Initializing Keycloak...");
    //debugger; 
    keycloak.login()
  };
  return (
    <LampContainer>
      <MotionBox
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        mt={8}
        bgGradient="linear(to-br, slate.300, slate.500)"
        py={4}
        bgClip="text"
        textAlign="center"
        fontSize={{ base: "4xl", md: "7xl" }}
        fontWeight="medium"
        tracking="tight"
        textColor="transparent"
      >
        <Link to="/dashboard">

          <Button
            onClick={handleClick}
            width="full"
            justifyContent="center"
            rounded="md"
            bg="indigo.500"
            px={3}
            py={1.5}
            fontSize="sm"
            fontWeight="semibold"
            textColor="white"
            shadow="sm"
            _hover={{ bg: "indigo.400" }}
            _focusVisible={{
              outline: "2px solid",
              outlineOffset: "2px",
              outlineColor: "indigo.500",
            }}
          >
            Sign in
          </Button>
        </Link>
      </MotionBox>
    </LampContainer>
  );
};

export default Login;
