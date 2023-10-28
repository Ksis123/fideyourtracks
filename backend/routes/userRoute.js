const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const user = new User(req.body);
    const existingUser = await User.findOne({ email: req.body.email });
    const oldname = await User.findOne({ name: req.body.name });
    if (req.body.name.length < 4) {
      return res.status(200).json({ message: "Username must be more 3 characters" });
    }
    if (oldname) {
      return res.status(200).json({ message: "Username already exists" });
    }
    if (password.length < 6 || password.length > 12) {
      return res.status(200).json({ message: "Password must be 6-12 characters" });
    }
    if (existingUser) {
      return res.status(200).send({ message: "E-mail already exists", success: false });
    } else {
      await user.save();
      return res.status(200).send({ message: "Sign-up successfully", success: true });
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
        .send({ message: "E-mail does not exist", success: false });
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
        message: "Sign-in successfully",
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



//----------------------Profile-----------------------------------------------
// Get current user (protected)
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

router.put("/update-user", authMiddleware, async (req, res) => {
  try {
    if (req.body.newPassword && req.body.oldPassword) {
      const oldPassword = req.body.oldPassword;
      const user = await User.findById(req.body._id);
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordCorrect) throw new Error("The old password is incorrect");

      const newPassword = await bcrypt.hash(req.body.newPassword, 10);
      req.body.password = newPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    }).select("-password");
    res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

router.post("/deleteuser", authMiddleware, async (req, res) => {
  const userid = req.body.userid
  try {
    await User.findOneAndDelete({ _id: userid })
    res.send('User Deleted Successfully')
  } catch (error) {
    return res.status(400).json({ message: error });
  }

});

router.post("/send-reset-password-link", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User does not exist", success: false });
    }
    await sendEmail(user, "reset-password");
    res.status(200).json({ message: "E-mail sent successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/verify-reset-password-token", async (req, res) => {
  try {
    const { token } = req.body;
    const tokenObj = await Token.findOne({ token });
    if (!tokenObj) {
      return res
        .status(200)
        .json({ message: "Token is invalid", success: false });
    }
    const user = await User.findOne({ _id: tokenObj.userId.toString() });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User does not exist", success: false });
    }
    res
      .status(200)
      .json({ message: "Token verified successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    let { token } = req.body;
    const password = req.body.password;

    const tokenObj = await Token.findOne({ token });
    if (!tokenObj) {
      return res
        .status(200)
        .json({ message: "Token is invalid", success: false });
    }
    const user = await User.findOne({ _id: tokenObj.userId.toString() });
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    if (password.length < 6 || password.length > 12) {
      return res.status(200).json({ message: "Password must be 6-12 characters" });
    }

    await user.save();
    
    await Token.findOneAndDelete({ token });

    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
module.exports = router;
