const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const NewUser = require('../models/NewUser');

passport.use(new LocalStrategy(NewUser.authenticate()));

passport.serializeUser(NewUser.serializeUser());
passport.deserializeUser(NewUser.deserializeUser());

module.exports = passport;
