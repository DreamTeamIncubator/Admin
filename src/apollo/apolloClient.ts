import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getMainDefinition} from '@apollo/client/utilities';

const httpLink = new HttpLink({
    uri: '/api/api/v1/graphql',
    headers: {
        Authorization: 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu',
    },
});

const wsLink = new WebSocketLink(
    new SubscriptionClient('wss://inctagram.work/api/v1/graphql', {
        reconnect: true,
        connectionParams: {
            authorization: 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu',
        },
    })
);

const splitLink = split(
    ({ query }) => {
        const def = getMainDefinition(query);
        return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    wsLink,
    httpLink
);
//
// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache(),
// });



export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getPosts: {
                    keyArgs: false,
                    merge(existing = { items: [] }, incoming) {
                        return {
                            ...incoming,
                            items: [...existing.items, ...incoming.items],
                        };
                    },
                },
            },
        },
    },
});


const client = new ApolloClient({
    link: splitLink,
    cache
});

export default client;
