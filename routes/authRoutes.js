const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/callback", passport.authenticate("google"), (req, res) => {
  console.log("auth/google/callback");
  // res.send({ callback: "hey" });
  res.redirect("/surveys");
});

module.exports = router;
