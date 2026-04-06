using HairDesign.App.Entities;
using HairDesign.App.Infrastructure;
using HairDesign.App.Modules.CustomerActions.Models;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Modules.CustomerActions.Commands
{
    public class CreateCustomerActionCommand
    {
        private readonly ApplicationDbContext _context;

        public CreateCustomerActionCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CustomerActionResponse> Execute(CustomerActionUpdateDTO dto)
        {
            var exists = await _context.Customers.AnyAsync(x => x.Id == dto.CustomerId);
            if (!exists)
                throw new Exception("Customer not found");

            var action = new CustomerAction
            {
                Id = Guid.NewGuid(),
                CustomerId = dto.CustomerId,
                Title = dto.Title,
                Date = dto.Date,
                Note = dto.Note,
                ColorNote = dto.ColorNote,
                Price = dto.Price,
                CreatedAt = DateTime.UtcNow
            };

            _context.CustomerActions.Add(action);
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