import { Box, Flex,Avatar} from "@chakra-ui/react";
export const Logo = ({ collapse }: { collapse: boolean }) => (
  <Flex
    w="full"
    alignItems="center"
    justifyContent="space-between"
    flexDirection={collapse ? "row" : "column"}
    gap={3}
   
  >
    <Box display="flex" alignItems="center" gap={3} p="3" mt={"2"} >
    <Avatar name='proxym' src='\src\assets\logoproxym.png' size="sm" mb={"1"} />
    </Box>
    
  </Flex>
);
