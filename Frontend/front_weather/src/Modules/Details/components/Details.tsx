import { Flex, useColorModeValue, Center} from '@chakra-ui/react';
import { FlexContainerStyle, flexContainerStyle1 } from '../../Home/styles/homeStyle';
import { SearchBar } from '../../../Layouts/components/Navelements/SearchBar';
import { Coinuser } from '../../../Layouts/components/Navelements/Coinuser';
import { useNavigate } from 'react-router-dom';
import { MenuMarine } from '../../../Layouts/components/MenuMarine';

const Details = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/details');
  };

  return (
    <Flex
      as="main"
      bg={useColorModeValue('rgba(201, 203, 207, 0.3)', '#111015')}
      {...FlexContainerStyle}
      flexDirection={'column'}
    >
      <Flex {...flexContainerStyle1}>
        <SearchBar redirectPath="/Details" />
        <Coinuser />
      </Flex>
      <Flex flexDirection="row" justifyContent={"space-between"} m={"1"}>
        <Center fontSize="29px" ml="37rem" onClick={handleNavigate}>Air quality and Marine forecast</Center>
      </Flex>
      <Flex display="flex" flexDirection="row" justifyContent="space-between" margin="0rem">
        <MenuMarine />
      </Flex>
   
    </Flex>
  );
};

export default Details;
