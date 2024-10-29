import express from "express";
import auth from "../auth.js";
import axios from "axios";
import jsonfile from "jsonfile";

const router = express.Router();
const url = "./data/images.json";
router.get("/", async (req, res) => {
  const path = {
    method: "GET",
    url: "https://api.unsplash.com/collections/uihQJFcseCo/photos",
    headers: {
      Accept: "Application/json",
      Authorization: "Client-ID sXn8muM-9RFeAIHiNvjbpbEVQXPYlLT49hUI_ixPG-4",
    },
  };
  const response = await axios(path);
  console.log(response.data);
  res.json(response.data);
  //  const BASE_URL = "https://api.unsplash.com/collections/uihQJFcseCo/photos";
  //  const totalImages = 100;
  //  const perPage = 30; // Adjust per page limit if required, Unsplash API allows max 30
  //  const totalPages = Math.ceil(totalImages / perPage);
  //  const headers = {
  //    Accept: "application/json",
  //    Authorization: "Client-ID sXn8muM-9RFeAIHiNvjbpbEVQXPYlLT49hUI_ixPG-4",
  //  };
  //
  //  try {
  //    // Read data from local JSON file
  //    let jsonData = await jsonfile.readFile(url);
  //
  //    // Ensure the images array exists
  //    if (!jsonData.images) {
  //      jsonData.images = [];
  //    }
  //
  //    const fetchedImages = [];
  //
  //    // Fetch images from Unsplash API using pagination
  //    for (let page = 1; page <= totalPages; page++) {
  //      const apiUrl = `${BASE_URL}?page=${page}&per_page=${perPage}`;
  //      const response = await axios.get(apiUrl, { headers });
  //
  //      if (response.data && response.data.length > 0) {
  //        fetchedImages.push(...response.data);
  //      } else {
  //        console.warn(`No data on page ${page}`);
  //      }
  //    }
  //
  //    // Save the image URLs to the local JSON file
  //    for (const image of fetchedImages) {
  //      // Assuming you want to store the regular URL of each image
  //      jsonData.images.push({ url: image.urls.regular });
  //    }
  //
  //    // Write updated data to JSON file
  //    //await jsonfile.writeFile(url, jsonData, { spaces: 2 });
  //
  //    res.json({
  //      message: "This is a protected route.",
  //      images: jsonData.images,
  //    });
  //  } catch (error) {
  //    console.error("Error:", error.message);
  //    res
  //      .status(500)
  //      .json({ message: "An error occurred.", error: error.message });
  //  }
});

export default router;
