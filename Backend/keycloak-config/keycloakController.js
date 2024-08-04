
import keycloak from './keycloakService.js'

const excludedRoutes = ['/public', '/unprotected'];

export async function protectRoute(req, res, next) {
  if (excludedRoutes.includes(req.path)) {
      return next();
  }
  keycloak.protect()(req, res, next);
}

export async function logout(req, res) {
  req.logout();
  res.redirect('/');
}




