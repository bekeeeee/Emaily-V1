const mongoose = require("mongoose");
const RecipintSchema = require("./RecipientsModel");
const surveySchema = new mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipintSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
  drafted: Boolean,
});
const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
