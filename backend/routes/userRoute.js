const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    } else {
      await user.save();
      return res
        .status(200)
        .send({ message: "User Sign-up successfully", success: true });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const passwordsMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordsMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "User Sign-in successfully",
        success: true,
        data: token,
      });
    } else {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post("/get-user-data", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = undefined;
    return res.status(200).send({
      message: "User data fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body
  try {
    const oldUser = await User.findOne({ email })
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" })
    }
    const secret = process.env.SECRET_KEY + oldUser.password
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    })
    const link = `http://localhost:5000/api/auth/resetpassword/${oldUser._id}/${token}`
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "b6311223@g.sut.ac.th",
        pass: "rwmlfkylxgxyrsgz",
      },
    })

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "Reset : Password",
      text: link,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })
    console.log(link)
  } catch (error) {
    res.send({ status: "error" })
  }
})

router.get("/resetpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params
  console.log(req.params)
  const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" })
  }
  const secret = process.env.SECRET_KEY + oldUser.password
  try {
    const verify = jwt.verify(token, secret)
    res.render("forgotpassword", { email: verify.email, status: "Not Verified" })
  } catch (error) {
    console.log(error)
    res.send("Not Verified")
  }
})

router.post("/resetpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" })
  }
  const secret = process.env.SECRET_KEY + oldUser.password
  try {
    const verify = jwt.verify(token, secret)
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    )

    res.render("forgotpassword", { email: verify.email, status: "verified" })
  } catch (error) {
    console.log(error)
    res.json({ status: "Something Went Wrong" })
  }
})


module.exports = router;
