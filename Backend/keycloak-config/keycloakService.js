import  Keycloak from 'keycloak-connect';
import session from 'express-session';
const memoryStore = new session.MemoryStore();


const kcConfig = {
  clientId: 'myclient',
  bearerOnly: false,
  serverUrl: 'http://localhost:8080',
  realm: 'weather',
  credentials: {
    secret: 'g31AFxdr8mNBPP0dbjUMeHTfm99bIBM5' // Remplacer par le secret de votre client
  }
};

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

export default keycloak
