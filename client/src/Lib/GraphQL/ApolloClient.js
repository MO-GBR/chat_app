import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const serverUri = import.meta.env.VITE_MODE === "development" 
    ? import.meta.env.VITE_DEVELOPMENT_GQL_URL
    : import.meta.env.VITE_PRODUCTION_GQL_URL;

const httpLink = createHttpLink({
    uri: serverUri
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: "include",
});