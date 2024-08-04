// src/App.tsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactKeycloakProvider } from '@react-keycloak/web'
import KeycloakInstance from "./Keycloak/Keycloak";
import NotificationSetup from "./Layouts/components/NotificationSetup"



const App: React.FC = () => {
  const queryClient = new QueryClient();
  queryClient.setQueryData('selectedCity', 'Sousse')
  return (
    <ReactKeycloakProvider authClient={KeycloakInstance}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
        <NotificationSetup /> {/* Include the NotificationSetup component */}
          <AppRoutes />
        </ChakraProvider>
      </QueryClientProvider>
    </HelmetProvider>
    </ReactKeycloakProvider>

  );
};

export default App;
