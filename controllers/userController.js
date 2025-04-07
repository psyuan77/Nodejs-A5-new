const passport = require('passport');
const NewUser = require('../models/NewUser');

exports.showLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.showRegister = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.render('register', {
        title: 'Register',
        error: 'Passwords do not match'
      });
    }

    // Check if user already exists
    const existingUser = await NewUser.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('register', {
        title: 'Register',
        error: existingUser.username === username ? 'Username already exists' : 'Email already exists'
      });
    }

    // Create new user
    const user = new NewUser({ username, email });
    await NewUser.register(user, password);

    // Log in the new user
    req.login(user, (err) => {
      if (err) {
        return res.render('register', {
          title: 'Register',
          error: 'Registration failed'
        });
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', {
      title: 'Register',
      error: 'Registration failed'
    });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Login error:', err);
      return res.render('login', {
        title: 'Login',
        error: 'Authentication failed'
      });
    }
    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: info?.message || 'Invalid username or password'
      });
    }
    req.login(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
