const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    type: { type: String, required: false },
    nation: { type: String, required: false },
    password: { type: String, required: true },
    playlists: { type: Array, required: false },
    isMember: { type: Boolean, required: false, default: true },

  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
