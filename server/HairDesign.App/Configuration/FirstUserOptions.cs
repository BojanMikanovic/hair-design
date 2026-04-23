namespace HairDesign.App.Configuration
{
    public class FirstUserOptions
    {
        public const string SectionName = "FirstUser";

        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PictureUrl { get; set; }
    }
}
