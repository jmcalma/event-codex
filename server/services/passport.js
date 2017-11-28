const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const Users = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '230288455038-c45spub9n119t8te07jf44odhk38sh8h.apps.googleusercontent.com',
      clientSecret: 'aqWJTGtaYl6xiSXxoYmn2pyV',
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await Users.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser); // first argu: err is null, second argu: exist user
      }
      const user = await new Users({ googleId: profile.id }).save();
      done(null, user); // save() put the model instance into mongodb collection
    }
  )
);
