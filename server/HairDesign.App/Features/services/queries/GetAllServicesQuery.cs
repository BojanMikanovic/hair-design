using HairDesign.App.Features.services.models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.services.queries
{
    public class GetAllServicesQuery
    {
        private readonly ApplicationDbContext _context;

        public GetAllServicesQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ServiceResponse>> Execute()
        {
            return await _context.Services
                .OrderBy(x => x.Name)
                .Select(x => new ServiceResponse
                {
                    Id = x.Id,
                    Name = x.Name,
                    CreatedAt = x.CreatedAt
                })
                .ToListAsync();
        }
    }
}