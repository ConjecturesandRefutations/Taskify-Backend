const { expressjwt: jwt } = require("express-jwt");
 
// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'user', // now accessible via req.user
  getToken: getTokenFromHeaders
});

// Function used to extracts the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders (req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  } 
  return null;
}
 
// Export the middleware so that we can use it to create a protected routes
module.exports = {
  isAuthenticated
}