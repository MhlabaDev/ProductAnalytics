
PRODUCT ANALYTICS DASHBOARD

A modern React-based product analytics dashboard that fetches real-time data from a backend API (ASP.NET Core or Node.js/Express) connected to the Singular Systems Tech Assessment Sales API.
The application displays a grid of products with live analytics such as total units sold, total revenue, and sales trends visualized in a line chart within a modal view.


FEATURES

* Real-time Product Data: Pulled directly from the live Azure-hosted API through a backend proxy (ASP.NET Core or Express).
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

Backend (Choose one):

**ASP.NET Core Backend (Recommended):**
* ASP.NET Core 8.0 Web API
* C# (.NET)
* Newtonsoft.Json (for JSON serialization)
* HttpClient (for external API requests)
* CORS (to allow communication between frontend and backend)

**Node.js/Express Backend (Alternative):**
* Node.js
* Express.js (used as proxy server)
* Axios (for server-side API requests)
* CORS (to allow communication between frontend and backend)

API Source:
[https://singularsystems-tech-assessment-sales-api2.azurewebsites.net](https://singularsystems-tech-assessment-sales-api2.azurewebsites.net)


HOW IT WORKS

1. The React frontend requests product data from the local backend server at:
   [http://localhost:5050/products](http://localhost:5050/products)

2. The backend proxy (ASP.NET Core or Express) forwards the request to the live Azure API to fetch product and sales data.

3. The ProductService combines product information with computed analytics:

   * totalQty = sum of saleQty
   * totalRevenue = sum of (saleQty * salePrice)

4. When a user clicks a product card, a modal opens showing details and a Chart.js line chart visualizing recent sales trends.



INSTALLATION AND SETUP

1. Clone the Repository:
   ```bash
   git clone https://github.com/MhlabaDev/ProductAnalytics.git
   cd ProductAnalytics
   ```

2. Install Frontend Dependencies:
   ```bash
   cd product-frontend
   npm install
   ```

3. Choose and Setup Backend:

   **Option A: ASP.NET Core Backend (Recommended)**
   
   Prerequisites:
   * .NET 8.0 SDK or later ([Download here](https://dotnet.microsoft.com/download))
   
   Setup:
   ```bash
   cd ../backend
   dotnet restore
   dotnet build
   ```
   
   Run the Backend:
   ```bash
   dotnet run
   ```
   The API will be available at:
   * HTTP: [http://localhost:5050](http://localhost:5050)
   * Swagger UI: [http://localhost:5050/swagger](http://localhost:5050/swagger) (Development only)
   
   **Option B: Node.js/Express Backend (Alternative)**
   
   Prerequisites:
   * Node.js (v14 or later)
   
   Setup:
   ```bash
   cd product-frontend
   npm install
   ```
   
   Run the Express Server:
   ```bash
   node server.js
   ```
   Server runs at: [http://localhost:5050](http://localhost:5050)

4. Run the React Frontend:
   ```bash
   cd product-frontend
   npm start
   ```
   React app runs at: [http://localhost:3000](http://localhost:3000)

**Important Notes:**
* Only run ONE backend at a time (either ASP.NET Core OR Express, not both)
* Both backends use port 5050, so make sure only one is running
* The frontend is configured to connect to `http://localhost:5050`
* Ensure the backend is running before starting the frontend



## BACKEND API ENDPOINTS

The backend provides the following endpoints:

* `GET /products` - Retrieves all products from the external API
* `GET /product-sales?Id={productId}` - Retrieves all sales for a specific product


### Configuration

The external API URL is configured in `appsettings.json`:
```json
{
  "ExternalApi": {
    "BaseUrl": "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net"
  }
}
```

### Running the ASP.NET Core Backend

**Using .NET CLI:**
```bash
cd ProductAnalytics/backend
dotnet restore
dotnet run
```



### Troubleshooting

* **Port 5050 already in use**: Make sure the Express server (if installed) is not running
* **CORS errors**: Ensure the backend CORS policy allows `http://localhost:3000`
* **Images not showing**: Verify the backend is returning the `image` field from the API
* **Connection refused**: Make sure the backend is running before starting the frontend


AUTHOR

Mhlaba Mkhatshane
Email: hlabisto28@gmail.com
GitHub: https://github.com/MhlabaDev




