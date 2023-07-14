import express from "express";
import "dotenv/config";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

// middlewares

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, console.log("server successfully started"));

app.post("/mail", async (req, res) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "spellbee931@gmail.com",
        pass: "iyodaocmlnjdrhkj",
      },
    });

    var mailOptions = {
      from: "spellbee931@gmail.com",
      to: "sarathkumartk98@gmail.com",
      subject: "Recruitement call",
      replyTo: req.body.email,
      text: req.body.message,
      subject: req.body.name,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({
          message: "We are Facing some problem with this service",
          error,
        });
      } else {
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
});
