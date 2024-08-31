import express from "express";
import auth from "../auth.js";

const router = express.Router();

router.get("/", auth, (req, res) => {
  console.log(req);
  res.json({ message: "This is a protected route.", user: req.user });
});

export default router;
