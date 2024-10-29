import axios from "axios";
import express from "express";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const option = {
      method: "GET",
      url: "https://api.unsplash.com/collections/uihQJFcseCo/photos",
      headers: {
        Authorization: "Client-ID sXn8muM-9RFeAIHiNvjbpbEVQXPYlLT49hUI_ixPG-4",
        Accept: "application/json",
      },
    };

    const response = await axios(option);
    console.log(response.data.urls.regular);
    res.json("Hello", response.data);
  } catch (error) {
    console.log(error);
  }
});
export default router;
