using System.ComponentModel.DataAnnotations;

namespace HairDesign.App.Modules.CustomerActions.Models
{
    public class CustomerActionUpdateDTO
    {
        public Guid CustomerId { get; set; }

        [Required]
        public required string Title { get; set; }

        public DateTime Date { get; set; }

        public string? Note { get; set; }

        public string? ColorNote { get; set; }

        public decimal Price { get; set; }
    }
}