import React, { useEffect, useState } from "react";
import { getProducts } from "../api/ProductService";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import "../App.css";

///<summary>
/// Chart.js library imports for creating a responsive sales trend line chart.
/// Registers required components.
///</summary>
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

///<summary>
/// Base URL for backend API calls (connected to custom local server).
/// Used for product and sales endpoints.
///</summary>
const BASE_URL = "http://localhost:5050";


function ProductDisplay() {
 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  ///<summary>
  /// Fetch all products with analytics when the component first mounts.
  /// Data comes from ProductService which calculates totals for each product.
  ///</summary>
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await getProducts();
        setProducts(productData);
      } catch (err) {
        console.error(" Error loading products:", err);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  ///<summary>
  /// Handles clicking on a product card.
  /// Fetches detailed sales data and displays it in a modal with a chart.
  ///</summary>
  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setSalesData([]);
    setChartLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/product-sales?Id=${product.id}`);
      setSalesData(response.data || []);
    } catch (err) {
      console.error("Error fetching product sales:", err);
      setSalesData([]);
    } finally {
      setChartLoading(false);
    }
  };

  ///<summary>
  /// Generate a unique list of categories for filtering dropdown.
  /// Includes an 'All' option to show every product.
  ///</summary>
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  ///<summary>
  /// Filters products based on search term and selected category.
  /// Returns only products matching both criteria.
  ///</summary>
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  ///<summary>
  /// Pagination setup to divide product results across multiple pages.
  ///</summary>
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  ///<summary>
  /// Navigates to a selected page number and scrolls smoothly to top.
  ///</summary>
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  ///<summary>
  /// Creates a formatted dataset for the line chart based on sales data.
  /// Includes proper date formatting and units sold values.
  ///</summary>
  const getChartData = () => {
    if (!salesData.length) return { labels: [], datasets: [] };

    const sortedData = [...salesData].sort(
      (a, b) => new Date(a.saleDate) - new Date(b.saleDate)
    );

    return {
      labels: sortedData.map((s) =>
        new Date(s.saleDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
      ),
      datasets: [
        {
          label: "Units Sold",
          data: sortedData.map((s) => s.saleQty),
          borderColor: "#E67E22",
          backgroundColor: "rgba(230, 126, 34, 0.2)",
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#E67E22",
        },
      ],
    };
  };

  ///<summary>
  /// Chart configuration options for axes, titles, and responsiveness.
  /// Includes axis labels for clarity.
  ///</summary>
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Sales Trend Over Time",
        font: { size: 16 },
        color: "#333",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: { size: 14 },
          color: "#555",
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Units Sold",
          font: { size: 14 },
          color: "#555",
        },
      },
    },
  };

  ///<summary>
  /// Conditional rendering for loading and error states.
  /// Displays messages when data is unavailable.
  ///</summary>
  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;


  return (
    <div className="product-container">
      {/* Header Section */}
      <div className="header">
        <h1 className="title">Product Dashboard</h1>
        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Product Grid Section */}
      <ProductGrid products={currentProducts} onCardClick={handleProductClick} />

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
      )}

      {/* Modal Section - Displays product details and chart */}
      {selectedProduct && (
        <div className="modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedProduct(null)}>
              &times;
            </span>
            <div className="modal-body">
              <img
                src={selectedProduct.image || "https://via.placeholder.com/400"}
                alt={selectedProduct.description}
                className="modal-image"
              />
              <div className="modal-details">
                <h2>{selectedProduct.description}</h2>
                <p className="category">{selectedProduct.category}</p>

                {/* Product Analytics Cards */}
                <div className="analytics-cards">
                  <div className="analytics-card">
                    <h3>Unit Price</h3>
                    <p>R{selectedProduct.salePrice?.toFixed(2) ?? "0.00"}</p>
                  </div>
                  <div className="analytics-card">
                    <h3>Total Sold</h3>
                    <p>{selectedProduct.totalQty ?? 0}</p>
                  </div>
                  <div className="analytics-card">
                    <h3>Total Revenue</h3>
                    <p>R{selectedProduct.totalRevenue?.toFixed(2) ?? 0}</p>
                  </div>
                </div>

                {/* Sales Line Chart Visualization */}
                <div style={{ marginTop: "25px", height: "260px" }}>
                  {chartLoading ? (
                    <p>Loading chart...</p>
                  ) : salesData.length > 0 ? (
                    <Line data={getChartData()} options={chartOptions} />
                  ) : (
                    <p>No sales data available for this product.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ProductDisplay;
