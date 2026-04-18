using HairDesign.App.Entities;
using HairDesign.App.Features.Customers.Models;
using HairDesign.App.Infrastructure;

namespace HairDesign.App.Features.Customers.Commands
{
    public class CreateCustomerCommand
    {
        private readonly ApplicationDbContext _context;

        public CreateCustomerCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerResponse> Execute(CustomerUpdateDTO dto)
        {
            var customer = new Customer
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Phone = dto.Phone,
                Email = dto.Email,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return new CustomerResponse
            {
                Id = customer.Id,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Phone = customer.Phone,
                Email = customer.Email,
                Notes = customer.Notes,
                CreatedAt = customer.CreatedAt
            };
        }
    }
}