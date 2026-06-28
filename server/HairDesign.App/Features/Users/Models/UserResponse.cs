namespace HairDesign.App.Features.Users.Models
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Initials { get; set; } = "";
        public string? PictureUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
