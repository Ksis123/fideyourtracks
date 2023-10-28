const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: String, required: true },
    src: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("track", songSchema);
