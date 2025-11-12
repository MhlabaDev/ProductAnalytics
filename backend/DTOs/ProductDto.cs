using Newtonsoft.Json;

namespace ProductAnalytics.Api.DTOs;

/// <summary>
/// Data Transfer Object for product information with analytics.
/// </summary>
public class ProductDto
{
    [JsonProperty("id")]
    public int ProductId { get; set; }
    public string? Description { get; set; }
    public string? Category { get; set; }
    public decimal? UnitPrice { get; set; }
    public decimal? SalePrice { get; set; }
    public string? Image { get; set; }
    public int TotalQty { get; set; }
    public decimal TotalRevenue { get; set; }
}

