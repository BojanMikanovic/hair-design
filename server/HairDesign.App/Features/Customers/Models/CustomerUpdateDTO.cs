namespace HairDesign.App.Modules.Customers.Models
{
    public class CustomerUpdateDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Notes { get; set; }
    }
}