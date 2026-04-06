using HairDesign.App.Infrastructure;
using HairDesign.App.Modules.Customers.Models;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.Customers.Queries
{
    public class GetCustomerByIdQuery
    {
        private readonly ApplicationDbContext _context;

        public GetCustomerByIdQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerResponse?> Execute(Guid id)
        {
            return await _context.Customers
                .Where(x => x.Id == id)
                .Select(x => new CustomerResponse
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Phone = x.Phone,
                    Email = x.Email,
                    Notes = x.Notes,
                    CreatedAt = x.CreatedAt
                })
                .FirstOrDefaultAsync();
        }
    }
}