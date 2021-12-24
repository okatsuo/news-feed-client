import { ApolloClient, createHttpLink, InMemoryCache, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppStorage } from '../../utils/appStorages';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({ uri: process.env.API_KEY })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AppStorage.user_token);
  return {
    headers: {
      ...headers,
      authorization: token || "",
    }
  }
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, link),
  cache: new InMemoryCache()
})