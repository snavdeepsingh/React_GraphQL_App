import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { PaginatedPosts } from '../generated/graphql';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(existing: PaginatedPosts | undefined, incoming: PaginatedPosts): PaginatedPosts {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming?.posts],
              };
            },
          }
        },
      },
    },
  })
});


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default MyApp
