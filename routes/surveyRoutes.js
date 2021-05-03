const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const express = require("express");
const Survey = require("../models/SurveyModel.js");
const router = express.Router();

router.get("/", requireLogin, async (req, res) => {
  const surveys = await Survey.find({
    _user: req.user.id,
    drafted: false,
  }).select({
    recipients: false,
    drafted: false,
  });
  res.send(surveys);
});
router.get("/draft", requireLogin, async (req, res) => {
  const surveys = await Survey.find({
    _user: req.user.id,
    drafted: true,
  }).select({
    recipients: false,
    drafted: false,
  });
  res.send(surveys);
});

router.post("/", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  // console.log("recipients", recipientss);
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
    drafted: false,
  });
  // console.log("survey==", survey);

  // Great place to send an email!
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    // await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});
router.post("/draft", requireLogin, async (req, res) => {
  // const { title, subject, body, recipients } = req.body;
  const recipients = req.body.recipients
    ? req.bode.recipients.split(",").map((email) => ({ email: email.trim() }))
    : [];
  const survey = new Survey({
    ...req.body,
    recipients,
    _user: req.user.id,
    dateSent: Date.now(),
    drafted: true,
  });
  // console.log("survey==", survey);
  console.log("draft");

  // Great place to send an email!

  try {
    // await survey.save({ validateBeforeSave: false });
    await survey.save();

    res.send({ status: "success" });
  } catch (err) {
    res.status(422).send({ status: "faild", err });
  }
});

router.delete("/:id", async (req, res) => {
  console.log("id=", req.params.id);
  console.log("deleteee");

  const survey = await Survey.findByIdAndDelete(req.params.id);
  if (!survey)
    return res.status(404).json({
      error: "No survey found with that ID",
    });
  return res.status(204).json({
    status: "success",
  });
});
router.get("/thanks", (req, res) => {
  res.send("Thanks for voting!");
});

router.post("/webhooks", (req, res) => {
  // console.log("body=",req.body)
  const p = new Path("/api/surveys/:surveyId/:choice");

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: { $elemMatch: { email, responded: false } },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;
