namespace HairDesign.App.Features.CustomerActions.Models
{
    public class CustomerActionUpdateDTO
    {
        public Guid CustomerId { get; set; }
        public Guid ServiceId { get; set; }
        public DateTime Date { get; set; }
        public string? Note { get; set; }
        public string? ColorNote { get; set; }
        public decimal Price { get; set; }
    }
}