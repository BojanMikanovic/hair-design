using HairDesign.App.Features.services.models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.services.commands
{
    public class UpdateServiceCommand
    {
        private readonly ApplicationDbContext _context;

        public UpdateServiceCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse?> Execute(Guid id, ServiceUpdateDTO dto)
        {
            var service = await _context.Services.FirstOrDefaultAsync(x => x.Id == id);

            if (service == null)
                return null;

            var name = dto.Name.Trim();

            var exists = await _context.Services.AnyAsync(x => x.Id != id && x.Name == name);
            if (exists)
                throw new Exception("Service already exists");

            service.Name = name;

            await _context.SaveChangesAsync();

            return new ServiceResponse
            {
                Id = service.Id,
                Name = service.Name,
                CreatedAt = service.CreatedAt
            };
        }
    }
}