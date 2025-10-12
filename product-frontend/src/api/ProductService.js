import axios from "axios";

const BASE_URL = "http://localhost:5000"; // ✅ your local proxy server — unchanged

// Fetch all products and include analytics data (totalQty & totalRevenue)
export const getProducts = async () => {
  try {
    // 1️⃣ Fetch all products
    const response = await axios.get(`${BASE_URL}/products`);
    const products = response.data || [];

    // 2️⃣ For each product, fetch related sales and calculate analytics
    const productsWithAnalytics = await Promise.all(
      products.map(async (product) => {
        try {
          // Fetch all sales records for this product
          const salesResponse = await axios.get(`${BASE_URL}/product-sales?Id=${product.id}`);
          const salesArray = salesResponse.data || [];

          // Calculate total quantity sold
          const totalQty = salesArray.reduce((sum, sale) => sum + (sale.saleQty || 0), 0);

          // Calculate total revenue = saleQty * salePrice
          const totalRevenue = salesArray.reduce(
            (sum, sale) => sum + (sale.saleQty || 0) * (sale.salePrice || product.salePrice || 0),
            0
          );

          // Return product enriched with analytics data
          return { ...product, totalQty, totalRevenue };
        } catch (error) {
          console.error(`❌ Error fetching sales for product ${product.id}:`, error.message);
          return { ...product, totalQty: 0, totalRevenue: 0 };
        }
      })
    );

    return productsWithAnalytics;
  } catch (error) {
    console.error("❌ Error fetching products:", error.message);
    throw error;
  }
};

// Fetch analytics for a single product by ID
export const getProductAnalyticsById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/product-sales?Id=${productId}`);
    const salesArray = response.data || [];

    const totalQty = salesArray.reduce((sum, sale) => sum + (sale.saleQty || 0), 0);
    const totalRevenue = salesArray.reduce(
      (sum, sale) => sum + (sale.saleQty || 0) * (sale.salePrice || 0),
      0
    );

    return { totalQty, totalRevenue };
  } catch (error) {
    console.error(`❌ Error fetching analytics for product ${productId}:`, error.message);
    return { totalQty: 0, totalRevenue: 0 };
  }
};
