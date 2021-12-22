import '../styles/globals.css'
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache';
import Head from 'next/head';
import theme from '../styles/theme';
import { CssBaseline, NoSsr } from '@mui/material';
import { GlobalContextProvider } from '../context/globalContextProvider';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/client';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>News Feed</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalContextProvider>
          <ApolloProvider client={apolloClient}>
            <NoSsr>
              <Component {...pageProps} />
            </NoSsr>
          </ApolloProvider>
        </GlobalContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
