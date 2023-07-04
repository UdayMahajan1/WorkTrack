function sessionMiddleware(req, res, next) {
  // Check if session exists
  if (req.session.username && req.session.role === 'Admin') {
    // Session exists, allow request to continue
    next();
  } else {
    // Session does not exist, redirect to login or perform other action
    res.redirect('/');
  }
}

module.exports = sessionMiddleware;
