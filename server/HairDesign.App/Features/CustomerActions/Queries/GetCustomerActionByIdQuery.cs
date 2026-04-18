using HairDesign.App.Features.CustomerActions.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.CustomerActions.Queries
{
    public class GetCustomerActionByIdQuery
    {
        private readonly ApplicationDbContext _context;

        public GetCustomerActionByIdQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerActionResponse?> Execute(Guid id)
        {
            return await _context.CustomerActions
                .Where(x => x.Id == id)
                .Select(x => new CustomerActionResponse
                {
                    Id = x.Id,
                    CustomerId = x.CustomerId,
                    CustomerName = x.Customer.FirstName + " " + x.Customer.LastName,
                    ServiceId = x.ServiceId,
                    ServiceName = x.Service.Name,
                    Date = x.Date,
                    Note = x.Note,
                    ColorNote = x.ColorNote,
                    Price = x.Price,
                    CreatedAt = x.CreatedAt
                })
                .FirstOrDefaultAsync();
        }
    }
}