import { Flex,useColorModeValue, Text,Button} from '@chakra-ui/react'
import { FlexContainerStyle, flexContainerStyle1 } from '../../Home/styles/homeStyle'
import { SearchBar } from '../../../Layouts/components/Navelements/SearchBar';
import { Coinuser } from '../../../Layouts/components/Navelements/Coinuser'
import {Menudetailswind } from '../../../Layouts/components/Menudetailswind';
import { useToast } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import { fetchdailyTemperature } from "../../../Services/Temperature/Temperatureservicesdaily";
import { useQuery } from "react-query";
import useSelectedCity from '../../../react-query/selectedCity';

const Detailswind = () => {

  const { selectedCity, setSelectedCity } = useSelectedCity();
  useEffect(() => {
    if (!selectedCity) {
      setSelectedCity("Sousse");
    }
  }, [selectedCity, setSelectedCity]); // Add dependencies to the useEffect


    const navigate = useNavigate()
  const handleNavigateToTemperature  = ( )=>{
    navigate(`/Windspeed`,) }

  const toast = useToast();

  const handleToastClick = () => {
    toast({
      title: "Weekly Wind speed",
      status: "success",
      isClosable: true,
    });
  };
  const { data: dailyTemperatureData } = useQuery({
    queryKey: ["daily_temperature", selectedCity],
    queryFn: () => fetchdailyTemperature(selectedCity),
  });
  const city = dailyTemperatureData ? dailyTemperatureData[0].city : null;
    return (

        <Flex
            as="main"
            bg={useColorModeValue('rgba(201, 203, 207, 0.3)', '#111015')}
            {...FlexContainerStyle}
            flexDirection={'column'}
            
            
        >
            <Flex
                {...flexContainerStyle1}>
                <SearchBar redirectPath="/Details/Detailswind/Wind "/>
                <Coinuser />
            </Flex>
            <Flex flexDirection="row" justifyContent={"space-between"} m={"3"} >
        <Text fontSize="21">{city}, As of Today</Text>
        <Button h={"45px"} fontSize={"lg"} _hover= {{color: '#932595'} }  colorScheme='teal' variant='outline' 
         transition="all 0.3s ease"  position="relative"  onClick={() => {
          handleNavigateToTemperature();
          handleToastClick();
        }}>
         Weekly Wind Speed</Button>
       
      </Flex>

            <Flex
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                margin="1rem"
            >
              <Menudetailswind/> 
            </Flex>

        </Flex>


    );
};

export default Detailswind
