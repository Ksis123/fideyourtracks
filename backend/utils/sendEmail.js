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
    <h3>Password Reset</h3>
    <p>
        We received a request to reset your password. 
        If you did not make this request, please ignore this email.
    </p>
    <a href="http://localhost:3000/users/reset-password/${savedToken.token}">
    Click here to reset Your Password
    </a>
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
