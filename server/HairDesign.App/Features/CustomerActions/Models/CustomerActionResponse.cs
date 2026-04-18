namespace HairDesign.App.Features.CustomerActions.Models
{
    public class CustomerActionResponse
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; } = null!;
        public Guid ServiceId { get; set; }
        public string ServiceName { get; set; } = null!;
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public string? ColorNote { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}