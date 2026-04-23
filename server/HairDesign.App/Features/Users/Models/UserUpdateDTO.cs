using System.ComponentModel.DataAnnotations;

namespace HairDesign.App.Features.Users.Models
{
    public class UserUpdateDTO
    {
        [Required, EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public string? PictureUrl { get; set; }
    }
}
