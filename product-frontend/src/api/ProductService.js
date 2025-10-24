import axios from "axios";

///<summary>
/// Base URL of the backend API server used for fetching product and sales data.
///</summary>
const BASE_URL = "http://localhost:5050";

///<summary>
/// Fetch all products and enrich each product with analytics data (totalQty and totalRevenue).
/// This function retrieves all products, their sales records, and calculates summary statistics.
///</summary>
export const getProducts = async () => {
  try {
    ///<summary>
    /// Fetch all products from the backend server.
    ///</summary>
    const response = await axios.get(`${BASE_URL}/products`);
    const products = response.data || [];

    ///<summary>
    /// For each product, retrieve sales data and calculate total quantity and revenue.
    ///</summary>
    const productsWithAnalytics = await Promise.all(
      products.map(async (product) => {
        try {
          ///<summary>
          /// Fetch all sales transactions for the specific product by product ID.
          ///</summary>
          const salesResponse = await axios.get(`${BASE_URL}/product-sales?Id=${product.id}`);
          const salesArray = salesResponse.data || [];

          ///<summary>
          /// Calculate total quantity sold by summing all saleQty values.
          ///</summary>
          const totalQty = salesArray.reduce((sum, sale) => sum + (sale.saleQty || 0), 0);

          ///<summary>
          /// Calculate total revenue as the sum of (saleQty × salePrice) for all sales.
          ///</summary>
          const totalRevenue = salesArray.reduce(
            (sum, sale) => sum + (sale.saleQty || 0) * (sale.salePrice || product.salePrice || 0),
            0
          );

          ///<summary>
          /// Return the product object enhanced with  analytics.
          ///</summary>
          return { ...product, totalQty, totalRevenue };
        } catch (error) {
          ///<summary>
          /// Handle individual product sales fetch errors gracefully and return default analytics.
          ///</summary>
          console.error(`Error fetching sales for product ${product.id}:`, error.message);
          return { ...product, totalQty: 0, totalRevenue: 0 };
        }
      })
    );

    ///<summary>
    /// Return the final array of products with analytics data included.
    ///</summary>
    return productsWithAnalytics;
  } catch (error) {
    ///<summary>
    /// Handle global fetch errors when retrieving all products.
    ///</summary>
    console.error(" Error fetching products:", error.message);
    throw error;
  }
};

///<summary>
/// Fetch analytics data for a single product using its product ID.
/// Calculates total quantity sold and total revenue for that product.
///</summary>
export const getProductAnalyticsById = async (productId) => {
  try {
    ///<summary>
    /// Fetch all sales data associated with the provided product ID.
    ///</summary>
    const response = await axios.get(`${BASE_URL}/product-sales?Id=${productId}`);
    const salesArray = response.data || [];

    ///<summary>
    /// Calculate total quantity sold by summing all saleQty values.
    ///</summary>
    const totalQty = salesArray.reduce((sum, sale) => sum + (sale.saleQty || 0), 0);

    ///<summary>
    /// Calculate total revenue by multiplying quantity and sale price for all sales.
    ///</summary>
    const totalRevenue = salesArray.reduce(
      (sum, sale) => sum + (sale.saleQty || 0) * (sale.salePrice || 0),
      0
    );

    ///<summary>
    /// Return  analytics data for the specific product.
    ///</summary>
    return { totalQty, totalRevenue };
  } catch (error) {
    ///<summary>
    /// Handle any errors during the product analytics fetch process and return defaults.
    ///</summary>
    console.error(` Error fetching analytics for product ${productId}:`, error.message);
    return { totalQty: 0, totalRevenue: 0 };
  }
};
