using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.Customers.Commands
{
    public class DeleteCustomerCommand
    {
        private readonly ApplicationDbContext _context;

        public DeleteCustomerCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Execute(Guid id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(x => x.Id == id);

            if (customer == null)
                return false;

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}