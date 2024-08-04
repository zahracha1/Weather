// src/routes/index.tsx
import { useEffect } from "react";
import {
  Routes,
  Route,
  //Navigate,
} from "react-router-dom";
import Layout from "../Layouts/Layout.tsx";
import Home from "../Modules/Home/components/Home.tsx";
import Temperature from "../Modules/Temperature/Components/Temperature.tsx";
import Details from "../Modules/Details/components/Details.tsx";
import Precipitation from "../Modules/Precipitation/Components/Precipitaion.tsx";
import Windspeed from "../Modules/Windspeed/Components/Windspeed.tsx";
import Settings from "../Modules/Settings/Components/Settings.tsx";
import Detailsprecip from "../Modules/Details/components/Detailsprecip.tsx";
import Detailswind from "../Modules/Details/components/Detailswind.tsx";
import DetailsTemperature from "../Modules/Details/components/DetailsTemperature.tsx";
import { useKeycloak } from "@react-keycloak/web";

/*const RedirectRoute = () => {
  return window.location.hash.includes("#") ? (
    <Navigate to="/not-found" replace />
  ) : null;
};*/

export const PrivateRoutes = () => {
  const { keycloak } = useKeycloak()
  console.log('our  token is', keycloak.token)
  useEffect(() => {
    if (keycloak?.token) {
      localStorage.setItem('Token', keycloak.token);
      console.log('JWT saved in local storage:', keycloak.token);
    }
  }, [keycloak?.token]);

  //console.log("PRIVATE");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Home" element={<Home />} index />
        <Route path="/Temperature" element={<Temperature />} />
        <Route path="/Details" element={<Details />} />
        <Route path="DetailsTemperature/:day"element={<DetailsTemperature />} />
        <Route path="/Precipitation" element={<Precipitation />} />
        <Route path="/Windspeed" element={<Windspeed />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Details/Detailswind/:day" element={<Detailswind />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/Details/Detailsprecip/:day" element={<Detailsprecip />} />
        {/* <Route path="/Home/Temperature" element={<Temperature />} />
                        <Route path="/Home/Temperature" element={<Temperature />} />
                       */}
      </Route>
    </Routes>
  );
};
