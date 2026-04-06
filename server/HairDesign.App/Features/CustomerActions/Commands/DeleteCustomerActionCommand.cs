using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.CustomerActions.Commands
{
    public class DeleteCustomerActionCommand
    {
        private readonly ApplicationDbContext _context;

        public DeleteCustomerActionCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Execute(Guid id)
        {
            var action = await _context.CustomerActions.FirstOrDefaultAsync(x => x.Id == id);

            if (action == null)
                return false;

            _context.CustomerActions.Remove(action);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}