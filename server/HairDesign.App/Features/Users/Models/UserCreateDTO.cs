using System.ComponentModel.DataAnnotations;

namespace HairDesign.App.Features.Users.Models
{
    public class UserCreateDTO
    {
        [Required, EmailAddress]
        public required string Email { get; set; }

        [Required, MinLength(6)]
        public required string Password { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public string? PictureUrl { get; set; }
    }
}
