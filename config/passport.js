var passport = require('passport');
const { findOne } = require('../models/usuario');
var localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.HOST + "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    Usuario.findOrCreate(profile, function (err, user) {
      return done(err, user);
    });
  }
));



passport.use(new localStrategy(
    function (email, password, done) {
        Usuario.findOne({ email: email }, function (err, usuario) {
            if (err) done(err);
            if (!usuario) return done(null, false, { message: "Mail no existente, verifique el email ingresado" })
            if (!usuario.validPassword(password)) return done(null, false, { message: "el password es incorrecto" })
            return done(null, usuario)
        })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
})

passport.deserializeUser(function (id, cb) {
    Usuario.findById(id, function (err, usuario) {
        cb(err, usuario);
    })
})

exports.module = passport;