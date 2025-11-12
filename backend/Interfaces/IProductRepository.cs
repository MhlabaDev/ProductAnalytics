using ProductAnalytics.Api.Models;

namespace ProductAnalytics.Api.Interfaces;

/// <summary>
/// Repository interface for product data operations.
/// </summary>
public interface IProductRepository
{
    /// <summary>
    /// Retrieves all products from the external API.
    /// </summary>
    Task<IEnumerable<Product>> GetAllProductsAsync();

    /// <summary>
    /// Retrieves all sales for a specific product by product ID.
    /// </summary>
    Task<IEnumerable<ProductSale>> GetProductSalesAsync(int productId);
}

