using HairDesign.App.Infrastructure;
using HairDesign.App.Modules.Customers.Models;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.Customers.Commands
{
    public class UpdateCustomerCommand
    {
        private readonly ApplicationDbContext _context;

        public UpdateCustomerCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerResponse?> Execute(Guid id, CustomerUpdateDTO dto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(x => x.Id == id);

            if (customer == null)
                return null;

            customer.FirstName = dto.FirstName;
            customer.LastName = dto.LastName;
            customer.Phone = dto.Phone;
            customer.Email = dto.Email;
            customer.Notes = dto.Notes;

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