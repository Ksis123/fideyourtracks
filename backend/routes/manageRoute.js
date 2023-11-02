const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const { cloudinary } = require("../cloudinary");
const Song = require("../models/trackModel");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // AudioOnly .MP3 or .WAV
  if (!file.originalname.match(/\.(mp3|wav)$/)) {
    return cb(new Error('Only Audio files To Upload track!'), false)
  }
  cb(null, true)
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 

});


router.post("/add-track", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "fidetyourtracks",
        use_filename: true,
        resource_type: "raw",
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Something went wrong" });
        } else {
          const newsong = new Song({
            title: req.body.title,
            artist: req.body.artist,
            src: result.url,
            duration: req.body.duration,
            genre: req.body.genre
          });
          await newsong.save();
          const allSongs = await Song.find();
          res.status(200).send({
            message: "Upload track successfully",
            success: true,
            data: allSongs,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      message: "Error adding track",
      success: false,
      data: error,
    });
  }
}
);

router.post("/edit-track", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    let response = null;
    if (req.file) {
      response = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "fidetyourtracks",
        use_filename: true,
        resource_type: "raw",
      });
    }
    await Song.findByIdAndUpdate(req.body._id, {
      title: req.body.title,
      artist: req.body.artist,
      src: response ? response.url : req.body.src,
      duration: req.body.duration,
      genre: req.body.genre,

    });
    const allSongs = await Song.find();
    res.status(200).send({
      message: "Edited Track successfully",
      success: true,
      data: allSongs,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error adding track",
      success: false,
      data: error,
    });
  }
}
);

router.post("/delete-track", authMiddleware, async (req, res) => {
  try {
    await Song.findByIdAndDelete({ _id : req.body.trackId })

    const allSongs = await Song.find();
    res.status(200).send({
      message: "Delete Track Successfully'",
      success: true,
      data: allSongs,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Delete Track",
      success: false,
      data: error,
    });
  }

});


module.exports = router;
