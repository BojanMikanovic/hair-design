
namespace HairDesign.App.Entities
{
    public class Customer
    {
        public Guid Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<CustomerAction> Actions { get; set; } = new List<CustomerAction>();
    }
}