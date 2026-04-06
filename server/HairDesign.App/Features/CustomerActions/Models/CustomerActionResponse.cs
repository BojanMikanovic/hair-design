namespace HairDesign.App.Modules.CustomerActions.Models
{
    public class CustomerActionResponse
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; } 
        public required string Title { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public string? ColorNote { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}