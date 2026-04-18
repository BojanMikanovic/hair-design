using HairDesign.App.Features.services.models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.services.queries
{
    public class GetServiceByIdQuery
    {
        private readonly ApplicationDbContext _context;

        public GetServiceByIdQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse?> Execute(Guid id)
        {
            return await _context.Services
                .Where(x => x.Id == id)
                .Select(x => new ServiceResponse
                {
                    Id = x.Id,
                    Name = x.Name,
                    CreatedAt = x.CreatedAt
                })
                .FirstOrDefaultAsync();
        }
    }
}