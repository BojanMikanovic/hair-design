using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.services.commands
{
    public class DeleteServiceCommand
    {
        private readonly ApplicationDbContext _context;

        public DeleteServiceCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Execute(Guid id)
        {
            var service = await _context.Services.FirstOrDefaultAsync(x => x.Id == id);

            if (service == null)
                return false;

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}