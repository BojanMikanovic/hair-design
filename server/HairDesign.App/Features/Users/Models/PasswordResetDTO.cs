using System.ComponentModel.DataAnnotations;

namespace HairDesign.App.Features.Users.Models
{
    public class PasswordResetDTO
    {
        [Required, MinLength(6)]
        public required string NewPassword { get; set; }
    }
}
