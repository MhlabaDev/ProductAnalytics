// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

const BASE_URL = "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net";

// Allow requests from React frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Fetch products
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching products");
  }
});

// Fetch product sales
app.get("/product-sales", async (req, res) => {
  try {
    const { Id } = req.query; // get the query param from frontend
    if (!Id) return res.status(400).send("Missing product Id");

    // Forward Id to the real API
    const response = await axios.get(`${BASE_URL}/product-sales?Id=${Id}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching product sales");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
