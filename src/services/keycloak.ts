import Keycloak from 'keycloak-js'

const keycloakConfig = {
    clientId: 'myclient',
    realm: 'myrealm',
    url: 'http://localhost:8082/'
}

const keycloak = Keycloak(keycloakConfig)

export default keycloak