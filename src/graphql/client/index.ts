import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AppStorage } from '../../utils/appStorages';

const httpLink = createHttpLink({
  uri: 'http://localhost:5566/graphql'
})

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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})