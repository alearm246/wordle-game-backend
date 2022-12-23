const express = require("express");
const passport = require("passport");
const {
  login,
  logout,
} = require("../controllers/auth");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  login
);

router.get("/logout", logout);

module.exports = router;