const mongoose = require("mongoose");
const menberSchema  = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true , unique: true},
    playlists: { type: Array, required: false },
    ismember: { type: Boolean, required: false, default: false },
    date: {type: Date, default: Date.now}
  },
  { timestamps: true }
);
module.exports = mongoose.model("member", menberSchema );
