using HairDesign.App.Infrastructure;
using HairDesign.App.Modules.CustomerActions.Models;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.CustomerActions.Queries
{
    public class GetAllCustomerActionsQuery
    {
        private readonly ApplicationDbContext _context;

        public GetAllCustomerActionsQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerActionResponse>> Execute()
        {
            return await _context.CustomerActions
                .OrderByDescending(x => x.Date)
                .Select(x => new CustomerActionResponse
                {
                    Id = x.Id,
                    CustomerId = x.CustomerId,
                    Title = x.Title,
                    Date = x.Date,
                    Note = x.Note,
                    ColorNote = x.ColorNote,
                    Price = x.Price,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync();
        }
    }
}