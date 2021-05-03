const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const surveyRoutes = require("./routes/surveyRoutes");

const billingRoutes = require("./routes/billingRoutes");

require("./services/passport");

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", authRoutes);
app.use("/api/surveys", surveyRoutes);

// app.use(require("./middlewares/requireLogin"));
app.use("/api/stripe",require("./middlewares/requireLogin"), billingRoutes);

app.get("/api/user/current", (req, res) => {
  console.log("/api/user/current");
  res.send(req.user);
});
app.get("/api/logout", require("./middlewares/requireLogin"),(req, res) => {
  console.log("logout");
  req.logout();
  res.redirect("/surveys");
});

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // Like our main.js file, or main.css file

  app.use(express.static("client/build"));

  // Express will serve up the index.html file 
  // if it dosn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
console.log("PORT=", PORT);
app.listen(PORT);
// 429442377362-seur8evh576qhr6j9dr4j9ufmnhcpsif.apps.googleusercontent.com
// gkKgSM8L-JYhOhPi3Bo-aIBr
