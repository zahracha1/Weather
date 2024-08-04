import { Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { FlexContainerStyle, flexContainerStyle1 } from '../../Home/styles/homeStyle'
import { SearchBar } from '../../../Layouts/components/Navelements/SearchBar';
import { Coinuser } from '../../../Layouts/components/Navelements/Coinuser';
import Menusettings from "../../../Layouts/components/Menusettings"


const Settings= () => {
  return (
<>
      <Flex
        as="main"
        bg={useColorModeValue('white', '#111015')}
        {...FlexContainerStyle}
        flexDirection={'column'}
      >
        <Flex
          {...flexContainerStyle1}
        >
          <SearchBar />
          <Coinuser />
        </Flex>
        <Flex flexDirection="row"  >
          <HStack spacing="4" ml="4">
            
          </HStack>
        </Flex>

        <Flex
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          margin="1rem"
        >
       <Menusettings/>
        </Flex>
      </Flex>

      </>
  );
};
export default Settings;


