import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";
router.get("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail", // Path to sendmail
  });

  // Define email options
  const mailOptions = {
    from: "balajishelke27@gmail.com", // Sender email address
    to: "balaji.senwell@gmail.com", // List of recipients
    subject: "Test Email using Sendmail", // Subject line
    text: "Hello, this is a test email sent using sendmail!", // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error: ", error);
    }
    console.log("Email sent: ", info.response);
  });
});

export default router;
