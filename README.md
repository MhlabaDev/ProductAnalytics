
PRODUCT ANALYTICS DASHBOARD

A modern React-based product analytics dashboard that fetches real-time data from a Node.js + Express proxy server connected to the Singular Systems Tech Assessment Sales API.
The application displays a grid of products with live analytics such as total units sold, total revenue, and sales trends visualized in a line chart within a modal view.


FEATURES

* Real-time Product Data: Pulled directly from the live Azure-hosted API through an Express proxy.
* Sales Analytics: Automatically calculates and displays:
  • Unit Price
  • Total Quantity Sold
  • Total Revenue
* Sales Trend Visualization: Interactive line chart powered by Chart.js to visualize product performance over time.
* Search and Filter: Quickly find products by name or category.
* Responsive Grid Layout: Modern, mobile-friendly UI for easy browsing.
* Pagination: Efficient navigation through product pages.
* Modular Codebase: Clean separation of concerns for easy maintenance and scaling.



TECHNOLOGIES USED

Frontend:

* React (Hooks and Functional Components)
* CSS3 (Custom responsive styles)
* Chart.js and react-chartjs-2 (for data visualization)
* Axios (for API calls)

Backend:

* Node.js
* Express.js (used as proxy server)
* Axios (for server-side API requests)
* CORS (to allow communication between frontend and backend)

API Source:
[https://singularsystems-tech-assessment-sales-api2.azurewebsites.net](https://singularsystems-tech-assessment-sales-api2.azurewebsites.net)


HOW IT WORKS

1. The React frontend requests product data from the local Express server at:
   [http://localhost:5000/products](http://localhost:5000/products)

2. The Express proxy forwards the request to the live Azure API to fetch product and sales data.

3. The ProductService combines product information with computed analytics:

   * totalQty = sum of saleQty
   * totalRevenue = sum of (saleQty * salePrice)

4. When a user clicks a product card, a modal opens showing details and a Chart.js line chart visualizing recent sales trends.



INSTALLATION AND SETUP

1. Clone the Repository:
   git clone [https://github.com/yourusername/product-analytics-dashboard.git](https://github.com/yourusername/product-analytics-dashboard.git)
   cd product-analytics-dashboard

2. Install Dependencies:

   # Install frontend dependencies

   npm install

   # Move to backend folder and install

   cd server
   npm install

3. Run the Express Server:
   From the server directory:
   node server.js
   Server runs at:
   [http://localhost:5000](http://localhost:5000)

4. Run the React Frontend:
   From the project root directory:
   npm start
   React app runs at:
   [http://localhost:3000](http://localhost:3000)



AUTHOR

Mhlaba Mkhatshane
Email: (hlabisto28@gmail.com)
GitHub: (https://github.com/MhlabaDev)




Would you like me to make a **shorter version** (for project submissions or documentation headers), or keep this full-length one only?
