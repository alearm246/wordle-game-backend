const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const user = require("../db/models/User");
const userStats = require("../db/models/UserStat");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: process.env.GOOGLECALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //checks if there's an existing user in the databsae
        const currentUser = await user.findOne({ google_id: profile.id }, [
            'id', 'user_stats_id as "userStatsId"', 'username', 'google_id as "googleId"', 'email'
        ]);
        if (currentUser) {
           done(null, currentUser);
        } else {
          //creates new user and profile if no account exists already
          const newUserStats = await userStats.create();
          const newUser = await user.create(newUserStats.id, profile.id, profile.emails[0].value);
          done(null, newUser);
        }
      } catch (err) {
        done(err);
        console.error("error authenticating with google: ", err);
      }
    }
  )
);