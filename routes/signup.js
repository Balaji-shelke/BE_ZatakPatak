import express from "express";
import bcrypt from "bcryptjs";
import jsonfile from "jsonfile";

const router = express.Router();
const USERS_FILE = "./data/users.json";

router.post("/", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  try {
    const usersData = await jsonfile.readFile(USERS_FILE);

    // Check if email already exists
    const existingUser = usersData.users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: usersData.users.length + 1,
      username,
      email,
      password: hashedPassword,
    };

    usersData.users.push(newUser);
    await jsonfile.writeFile(USERS_FILE, usersData, { spaces: 2 });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

export default router;
