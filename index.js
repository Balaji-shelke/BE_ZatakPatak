import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import dotenv from "dotenv";
import profileRoute from "./routes/profile.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();
//"https://dummyjson.com/products"
const app = express();
// Setup Helment for security
app.use(helmet());

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

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Authentication API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port 'http://127.0.0.1:${PORT}'`)
);
