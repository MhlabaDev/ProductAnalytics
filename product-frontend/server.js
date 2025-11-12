const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Use port 5050 to avoid Windows HTTP.sys conflict
const PORT = process.env.PORT || 5050;

const BASE_URL = "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net";

// Allow requests from React frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}));

// Fetch all products
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).send("Error fetching products");
  }
});

// Fetch product sales
app.get("/product-sales", async (req, res) => {
  try {
    const { Id } = req.query;
    if (!Id) return res.status(400).send("Missing product Id");

    const response = await axios.get(`${BASE_URL}/product-sales?Id=${Id}`);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching product sales:", err.message);
    res.status(500).send("Error fetching product sales");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
