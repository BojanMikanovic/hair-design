namespace HairDesign.App.Features.Auth.Models
{
    public class UserResponse
    {
        public string Email { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Initials { get; set; } = "";
        public string? PictureUrl { get; set; }
    }
}
