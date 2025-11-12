using Microsoft.AspNetCore.Mvc;
using ProductAnalytics.Api.DTOs;
using ProductAnalytics.Api.Interfaces;
using ProductAnalytics.Api.Models;

namespace ProductAnalytics.Api.Controllers;

/// <summary>
/// Controller for handling product-related API endpoints.
/// </summary>
[ApiController]
[Route("")]
[Produces("application/json")]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly ILogger<ProductController> _logger;

    public ProductController(IProductRepository productRepository, ILogger<ProductController> logger)
    {
        _productRepository = productRepository;
        _logger = logger;
    }

    /// <summary>
    /// Gets all products from the external API.
    /// </summary>
    /// <returns>List of products</returns>
    [HttpGet("products")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        try
        {
            var products = await _productRepository.GetAllProductsAsync();
            var productsList = products.ToList();
            
            // Log first product to verify image is populated
            if (productsList.Any())
            {
                var firstProduct = productsList.First();
                _logger.LogInformation("First product - Id: {ProductId}, Description: {Description}, Image: {Image}", 
                    firstProduct.ProductId, firstProduct.Description, firstProduct.Image);
            }
            
            return Ok(productsList);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching products");
            return StatusCode(500, new { message = "Error fetching products", error = ex.Message });
        }
    }

    /// <summary>
    /// Gets all sales for a specific product by product ID.
    /// </summary>
    /// <param name="Id">Product ID</param>
    /// <returns>List of product sales</returns>
    [HttpGet("product-sales")]
    public async Task<ActionResult<IEnumerable<ProductSalesDto>>> GetProductSales([FromQuery] int Id)
    {
        try
        {
            if (Id <= 0)
            {
                return BadRequest(new { message = "Invalid product Id. Id must be greater than 0." });
            }

            var sales = await _productRepository.GetProductSalesAsync(Id);
            var salesList = sales.ToList();

            var salesDtos = salesList.Select(s => new ProductSalesDto
            {
                SaleId = s.SaleId,
                ProductId = s.ProductId,
                SaleQty = s.SaleQty,
                SalePrice = s.SalePrice,
                SaleDate = s.SaleDate
            }).ToList();

            return Ok(salesDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching product sales for product {ProductId}", Id);
            return StatusCode(500, new { message = "Error fetching product sales", error = ex.Message });
        }
    }
}

