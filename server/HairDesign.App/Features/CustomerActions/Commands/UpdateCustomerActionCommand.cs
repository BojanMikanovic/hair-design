using HairDesign.App.Infrastructure;
using HairDesign.App.Modules.CustomerActions.Models;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.CustomerActions.Commands
{
    public class UpdateCustomerActionCommand
    {
        private readonly ApplicationDbContext _context;

        public UpdateCustomerActionCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerActionResponse?> Execute(Guid id, CustomerActionUpdateDTO dto)
        {
            var action = await _context.CustomerActions.FirstOrDefaultAsync(x => x.Id == id);

            if (action == null)
                return null;

            var exists = await _context.Customers.AnyAsync(x => x.Id == dto.CustomerId);
            if (!exists)
                throw new Exception("Customer not found");

            action.CustomerId = dto.CustomerId;
            action.Title = dto.Title;
            action.Date = dto.Date;
            action.Note = dto.Note;
            action.ColorNote = dto.ColorNote;
            action.Price = dto.Price;

            await _context.SaveChangesAsync();

            return new CustomerActionResponse
            {
                Id = action.Id,
                CustomerId = action.CustomerId,
                Title = action.Title,
                Date = action.Date,
                Note = action.Note,
                ColorNote = action.ColorNote,
                Price = action.Price,
                CreatedAt = action.CreatedAt
            };
        }
    }
}