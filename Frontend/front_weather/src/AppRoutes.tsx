// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//import { useAuth } from './routes/useauth.tsx';
import { PrivateRoutes } from './routes/PrivateRoutes.tsx';
import { PublicRoutes } from './routes/PublicRoutes.tsx';
import { useKeycloak } from '@react-keycloak/web';
//import keycloak from './Keycloak/Keycloak.ts';
const AppRoutes: React.FC = () => {
    //const { status } = useAuth();
    const { keycloak } = useKeycloak();
    return (
        <Router>
             <Routes>
                {
                    keycloak.authenticated
                        ? <Route path="/*" element={<PrivateRoutes />} />
                        : <Route path="/*" element={<PublicRoutes />} />
                }        
            </Routes>    
        </Router>
    );
};

export default AppRoutes;
