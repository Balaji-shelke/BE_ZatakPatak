import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import dotenv from "dotenv";
import profileRoute from "./routes/profile.js";
import pdfGenration from "./routes/pdfGenration.js";
import mailRoute from "./routes/mail.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import testconfig from "./testconfig.js";
//import { MongoClient, ServerApiVersion } from "mongodb";
//import { connectToServer, getDb}from "./db.js";
import connectToServer from "./db.js";
import User from "./schema.js";


dotenv.config();
//"https://dummyjson.com/products"
const app = express();
// Setup Helment for security
app.use(helmet());
//app.use('',ejs.renderFile());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app;
// Setup Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
// Middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(cors()); // enabling CORS for all requests

// Routes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/profile", profileRoute);
app.use("/api/mail", mailRoute);
app.use("/api/pdfGenration", pdfGenration);
app.use("/api/testconfig",testconfig)

// Home route
app.get("/", (req, res) => {
 
  res.render("home");
  //res.send("Welcome to the Authentication API");
});

const PORT = process.env.PORT || 3000;
//app.listen(PORT, () =>
//  console.log(`Server running on port 'http://127.0.0.1:${PORT}'`)
//);
//connectToServer(function (err) {
//  if (err) {
//    console.error(err);
//    process.exit();
//  }
//
//  app.listen(PORT, function () {
//    console.log(`Server is running on port: ${PORT}`);
//  });
//});
connectToServer((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}`);
  });
});

app.get("/data", async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (err) {
    res.status(400).send("Error fetching data!");
  }
});
