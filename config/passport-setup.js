const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/AppUser');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      // options
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('passport callback function fired');

      User.findOne({ googleid: profile.id }).then(currentuser => {
        if (currentuser) {
          console.log('cURRENT uSER IS ', currentuser);
          done(null, currentuser);
        } else {
          // NO USER , NEW USER

          new User({
            googleid: profile.id,
            username: profile.displayName
          })
            .save()
            .then(newUser => {
              console.log('new user created', newUser);
            });

          done(null, newUser);
        }
      });
    }
  )
);
