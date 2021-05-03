const express = require("express");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log("token= ", req.body);
  //   if (!req.user) {
  //     return res.status(401).send({ error: "You must log in!" });
  //   }
  await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: req.body.id,
  });
  req.user.credits += 5;
  const user = await req.user.save();
  // console.log("user", user);
  res.send(user);
});

module.exports = router;
