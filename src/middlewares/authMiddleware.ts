function requiresLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).send("You must be logged in to view this page.");
  }
}

export const requiresAuth = requiresLogin;
