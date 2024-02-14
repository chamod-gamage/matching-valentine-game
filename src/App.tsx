import { ChakraProvider } from '@chakra-ui/react';
import theme from 'definitions/chakra/theme';
import '@fontsource/indie-flower';
import 'styles/global.scss';

import Home from 'pages';

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ChakraProvider>
  );
}

export default App;
