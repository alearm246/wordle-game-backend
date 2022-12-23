const jwt = require("jsonwebtoken");
const user = require("../db/models/User");

const verifyJwt = async (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token) {
    console.error("Token is null or undefined. You have to login");
    return res.status(404).send("Token is null or undefined. You have to login");
} 
  jwt.verify(token, "some random jwt secret", async (err, jwtUser) => {
    if(err) {
      console.error(`There was a problem trying to verify the jwt: ${err}`);
      res.status(404).send(`There was a problem trying to verify the jwt: ${err}`)
    }
    const currentUser = await user.joinAndFindOneByUserId(jwtUser.id);
    console.log("current usersssss: ", currentUser);

    req.user = {
      id: currentUser.userId,
      userStatsId: currentUser.userStatsId,
      username: null,
      email: currentUser.email,
      totalGamesPlayed: currentUser.totalGamesPlayed, 
      totalWins: currentUser.totalWins,
      totalLosses: currentUser.totalLosses,
      currentStreak: currentUser.currentStreak,
      maxStreak: currentUser.maxStreak,
      totalTimePlayed: currentUser.totalTimePlayed
    };

    next();
  })
};

module.exports = verifyJwt;