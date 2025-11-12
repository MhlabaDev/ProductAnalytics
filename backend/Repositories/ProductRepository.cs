using ProductAnalytics.Api.Interfaces;
using ProductAnalytics.Api.Models;
using Newtonsoft.Json;

namespace ProductAnalytics.Api.Repositories;

/// <summary>
/// Repository implementation for fetching product data from the external API.
/// </summary>
public class ProductRepository : IProductRepository
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;

    public ProductRepository(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _baseUrl = configuration["ExternalApi:BaseUrl"] 
            ?? "https://singularsystems-tech-assessment-sales-api2.azurewebsites.net";
    }

    /// <summary>
    /// Retrieves all products from the external API.
    /// </summary>
    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/products");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            
            // Configure JSON deserialization settings to match API response (camelCase)
            // Use default settings - JsonProperty attributes will handle the mapping
            var products = JsonConvert.DeserializeObject<List<Product>>(content) ?? new List<Product>();

            return products;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error fetching products from external API: {ex.Message}", ex);
        }
    }

    /// <summary>
    /// Retrieves all sales for a specific product by product ID.
    /// </summary>
    public async Task<IEnumerable<ProductSale>> GetProductSalesAsync(int productId)
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/product-sales?Id={productId}");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var sales = JsonConvert.DeserializeObject<List<ProductSale>>(content) ?? new List<ProductSale>();

            return sales;
        }
        catch (Exception ex)
        {
            throw new Exception($"Error fetching product sales from external API: {ex.Message}", ex);
        }
    }
}

