import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
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
