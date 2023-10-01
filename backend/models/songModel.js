const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    src: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("songs", songSchema);
