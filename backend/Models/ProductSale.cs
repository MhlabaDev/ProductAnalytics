using Newtonsoft.Json;

namespace ProductAnalytics.Api.Models;

/// <summary>
/// Represents a product sale transaction from the external API.
/// </summary>
public class ProductSale
{
    [JsonProperty("id")]
    public int SaleId { get; set; }
    public int ProductId { get; set; }
    public int SaleQty { get; set; }
    public decimal SalePrice { get; set; }
    public DateTime? SaleDate { get; set; }
}

