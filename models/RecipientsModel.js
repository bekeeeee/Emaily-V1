const mongoose = require("mongoose");
const recipintSchema = new mongoose.Schema({
  email: String,
  responded: { type: Boolean, default: false },
});
// const Recipient = mongoose.model("Recipient", recipintSchema);
module.exports = recipintSchema;
