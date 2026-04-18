namespace HairDesign.App.Entities
{
    public class CustomerAction
    {
        public Guid Id { get; set; }

        public Guid CustomerId { get; set; }

        public Guid ServiceId { get; set; }

        public DateTime Date { get; set; }

        public string? Note { get; set; }

        public string? ColorNote { get; set; }

        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; }

        public Customer Customer { get; set; } = null!;
        
        public Service Service { get; set; } = null!;
    }
}