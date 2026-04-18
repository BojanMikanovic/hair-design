namespace HairDesign.App.Features.services.models
{
    public class ServiceResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}