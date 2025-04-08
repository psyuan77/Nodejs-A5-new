const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roles.includes('admin')) {
    return next();
  }
  res.status(403).render('error', {
    message: 'Access denied. Admin privileges required.',
    error: { status: 403 }
  });
};

module.exports = {
  isAuthenticated,
  isAdmin
};
