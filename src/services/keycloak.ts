import Keycloak from 'keycloak-js'

const keycloakConfig = {
    clientId: 'oauth.rentcar',
    realm: 'myrealm',
    url: 'http://localhost:8082/'
}

const keycloak = Keycloak(keycloakConfig)

export default keycloak