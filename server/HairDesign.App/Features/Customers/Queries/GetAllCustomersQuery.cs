using HairDesign.App.Features.Customers.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Customers.Queries
{
    public class GetAllCustomersQuery
    {
        private readonly ApplicationDbContext _context;

        public GetAllCustomersQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerResponse>> Execute()
        {
            return await _context.Customers
                .OrderBy(x => x.LastName)
                .ThenBy(x => x.FirstName)
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
                .ToListAsync();
        }
    }
}