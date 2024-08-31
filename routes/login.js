import express from "express";
import bcrypt from "bcryptjs";
import jsonfile from "jsonfile";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const USERS_FILE = "./data/users.json";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const usersData = await jsonfile.readFile(USERS_FILE);
    const user = usersData.users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).json({ message: "Invalid  password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;
