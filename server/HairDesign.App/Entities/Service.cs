namespace HairDesign.App.Entities
{
    public class Service
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;
        
        public DateTime CreatedAt { get; set; }

        public ICollection<CustomerAction> CustomerActions { get; set; } = new List<CustomerAction>();
    }
}