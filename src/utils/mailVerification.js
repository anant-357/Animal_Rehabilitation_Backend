const nodemailer = require("nodemailer");
async function emailVerification(email, subject, template) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "Animal Rehabilitation Web",
    to: email,
    subject: subject,
    text: "Email Verification!",
    html: template,
  });
}

module.exports = emailVerification;
