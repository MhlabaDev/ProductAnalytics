
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

const BASE_URL = "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net";

///<summary>
/// Allow requests from React frontend
///</summary>

app.use(cors({ origin: "http://localhost:3000" }));

   ///<summary>
    /// Fetch all products .
    ///</summary>
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching products");
  }
});

    ///<summary>
    /// Fetch all products .
    ///</summary>
app.get("/product-sales", async (req, res) => {
  try {
    const { Id } = req.query; 
    if (!Id) return res.status(400).send("Missing product Id");

      ///<summary>
    /// Forward Id to the real API
    ///</summary>
   
    const response = await axios.get(`${BASE_URL}/product-sales?Id=${Id}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching product sales");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
