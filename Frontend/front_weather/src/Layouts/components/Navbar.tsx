import { Box} from "@chakra-ui/react";
import React from "react";
import  { SearchBar  } from "./Navelements/SearchBar"
import  { Coinuser } from "./Navelements/Coinuser"

export const Navbar = () => (
  <React.Fragment>
  <Box >
   <SearchBar redirectPath={""}/>
   </Box>
   <Coinuser/>
</React.Fragment>
  );
