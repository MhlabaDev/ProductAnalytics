using Newtonsoft.Json;

namespace ProductAnalytics.Api.Models;

/// <summary>
/// Represents a product entity from the external API.
/// </summary>
public class Product
{
    [JsonProperty("id")]
    public int ProductId { get; set; }
    
    [JsonProperty("description")]
    public string? Description { get; set; }
    
    [JsonProperty("category")]
    public string? Category { get; set; }
    
    [JsonProperty("salePrice")]
    public decimal? SalePrice { get; set; }
    
    [JsonProperty("image")]
    public string? Image { get; set; }
}

