const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { type: String, required: true },
    nation: { type: String, required: true },
    password: { type: String, required: true },
    playlists: { type: Array, required: false },
    isMember: { type: Boolean, required: false, default: true },

  },
  { timestamps: true }
);
module.exports = mongoose.model("user", userSchema);
