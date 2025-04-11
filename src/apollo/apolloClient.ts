import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: '/api/api/v1/graphql',
    headers: {
        Authorization: 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu',
    },
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;