const express = require("express");
const router = express.Router();
const User = require("../../model/user.js");
const bcrypt = require("bcrypt");
const emailVerification = require("../../utilities/emailvarification");
const verificationEmailTemplate = require("../../utilities/VerificationEmailTemplate");
const jwt = require("jsonwebtoken");

router.post("/registration", async function (req, res) {
  const { firstName, lastName, email, telephone, city, password } = req.body;

  if (!firstName || !lastName) {
    return res.json({ error: "First Name and Last Name is required" });
  }

  let existingUserCheck = await User.find({ email });

  if (existingUserCheck.length > 0) {
    return res.json({ error: "Email already in use" });
  }

  let name = firstName + " " + lastName;

  bcrypt.hash(password, 10, async function (err, hash) {
    let user = new User({
      name: name,
      email: email,
      p_number: telephone,
      city: city,
      password: hash,
    });

    user.save();
    let token = jwt.sign({ email }, process.env.JWTSECRET, { expiresIn: "1h" });
    emailVerification(
      user.email,
      "Verification Email",
      verificationEmailTemplate(token),
    );

    res.send(user);
  });
});

router.post("/emailVerification", async function (req, res) {
  const { authorization } = req.headers;

  const decoded = jwt.verify(authorization, process.env.JWTSECRET);
  console.log(decoded.email);
  let updateUser = await User.findOneAndUpdate(
    { email: decoded.email },
    { verified: true },
    { new: true },
  );
  res.json(updateUser);
});

module.exports = router;
