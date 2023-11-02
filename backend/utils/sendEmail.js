const nodemailer = require("nodemailer");
const Token = require("../models/tokenModel");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

module.exports = async (savedUser, type) => {
  try {
    const newToken = new Token({
      token: bcrypt.hashSync(savedUser._id.toString(), 10).replaceAll("/", ""),
      userId: savedUser._id,
    });
    const savedToken = await newToken.save();

    emailContent = `
    <div style="text-align: center;">
      <img src='https://salmon-charming-stingray-66.mypinata.cloud/ipfs/Qmby9QDniPG7R8bE8XTJvon8KGFX7ZdKFGyYbiPCb5W4zn?_gl=1*1dsog9a*_ga*MTE0ODI0Mjc0LjE2OTY4NjQ2MTU.*_ga_5RMPXG14TE*MTY5ODkyMTgyMS40NS4xLjE2OTg5MjE4NTAuMzEuMC4w' width="300" height="300">
      </img>
    <div/>
    <h3>Password Reset</h3>
    <p>
        Your account has been resetpassword link now to visit our website,
        
    </p>
    <p>
        If you did not make this request, please ignore this email
    </p>
    following URL
    <a href="http://localhost:3005/users/reset-password/${savedToken.token}">
        Click here to reset Your Password
    </a>
    <div style="text-align: left;">
      <p>Your Welcome,</p>
      <span>Fideyourtracks</span>
    <div/>
  `;


    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "b6311223@g.sut.ac.th",
        pass: "rwmlfkylxgxyrsgz",
      },
    });

    const mailOptions = {
      from: "b6311223@g.sut.ac.th",
      to: savedUser.email,
      subject: "Verify your email to reset password",
      html: emailContent,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
