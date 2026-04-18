using System.ComponentModel.DataAnnotations;

namespace HairDesign.App.Features.Customers.Models
{
    public class CustomerUpdateDTO
    {
        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public string? Phone { get; set; }

        public string? Email { get; set; }

        public string? Notes { get; set; }
    }
}