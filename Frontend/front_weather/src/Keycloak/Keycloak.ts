import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: "http://localhost:8080/",
    realm: "weather",
    clientId: "myclient",
};

const KeycloakInstance= new Keycloak(keycloakConfig);
export default KeycloakInstance;