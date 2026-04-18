using HairDesign.App.Entities;
using HairDesign.App.Features.services.models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.services.commands
{
    public class CreateServiceCommand
    {
        private readonly ApplicationDbContext _context;

        public CreateServiceCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse> Execute(ServiceUpdateDTO dto)
        {
            var name = dto.Name.Trim();

            var exists = await _context.Services.AnyAsync(x => x.Name == name);
            if (exists)
                throw new Exception("Service already exists");

            var service = new Service
            {
                Id = Guid.NewGuid(),
                Name = name,
                CreatedAt = DateTime.UtcNow
            };

            _context.Services.Add(service);
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