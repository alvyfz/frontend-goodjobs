import { ApolloClient, InMemoryCache } from "@apollo/client";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
    uri: "https://goodjobs.hasura.app/v1/graphql",
    headers: {
        "x-hasura-admin-secret":
        "3jG007NdXoiHieNO7bJm1p4jFqIaxIDQwgHL057DzKGsisNkQpFX6dOYeWcFlMDE",
    },
});

const wsLink = new WebSocketLink({
    uri: "wss://goodjobs.hasura.app/v1/graphql",
    options: {
        reconnect: true,
        connectionParams: {
        headers: {
            "x-hasura-admin-secret":
            "3jG007NdXoiHieNO7bJm1p4jFqIaxIDQwgHL057DzKGsisNkQpFX6dOYeWcFlMDE",
        },
        },
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;