import { Box, Center, ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import Form from './components/Form';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Center width="100vw" height="100vh">
        <Box textAlign="center" fontSize="xl" width="25%">
          <Form />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
