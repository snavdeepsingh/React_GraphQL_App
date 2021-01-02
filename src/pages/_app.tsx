import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';


function MyApp({ Component, pageProps }: any) {
  return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
  )
}

export default MyApp
