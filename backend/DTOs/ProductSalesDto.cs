using Newtonsoft.Json;

namespace ProductAnalytics.Api.DTOs;

/// <summary>
/// Data Transfer Object for product sales information.
/// </summary>
public class ProductSalesDto
{
    [JsonProperty("id")]
    public int SaleId { get; set; }
    public int ProductId { get; set; }
    public int SaleQty { get; set; }
    public decimal SalePrice { get; set; }
    public DateTime? SaleDate { get; set; }
}

