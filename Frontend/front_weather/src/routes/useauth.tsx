/* // src/auth/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import keycloak from "../Keycloak/Keycloak";

type Status = "checking" | "authenticated" | "no-authenticated";

type AuthContextType = {
  status: Status;
  setStatus: (status: Status) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<Status>("checking");
  //const [check, setcheck] = useState<boolean>(false);
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      setStatus("authenticated");
      console.log('our token --', keycloak.token);
        keycloak
        .loadUserInfo()
        .then((e) => {
          console.log('zuzu = ', e);
        })
        .catch((error) => {
          console.error('Failed to refresh token:', error);
        });
    };
    console.log('our token == ', keycloak.token);
    console.log('keycloak = ', keycloak);
  }, []);

  //console.log(check);

  return (
    <AuthContext.Provider value={{ status, setStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
 */