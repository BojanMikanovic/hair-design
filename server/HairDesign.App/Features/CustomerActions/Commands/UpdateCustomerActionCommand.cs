using HairDesign.App.Features.CustomerActions.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.CustomerActions.Commands
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
            var action = await _context.CustomerActions
                .FirstOrDefaultAsync(x => x.Id == id);

            if (action == null)
                return null;

            var customer = await _context.Customers
                .FirstOrDefaultAsync(x => x.Id == dto.CustomerId);

            if (customer == null)
                throw new Exception("Customer not found");

            var service = await _context.Services
                .FirstOrDefaultAsync(x => x.Id == dto.ServiceId);

            if (service == null)
                throw new Exception("Service not found");

            action.CustomerId = dto.CustomerId;
            action.ServiceId = dto.ServiceId;
            action.Date = dto.Date;
            action.Note = dto.Note;
            action.ColorNote = dto.ColorNote;
            action.Price = dto.Price;

            await _context.SaveChangesAsync();

            return new CustomerActionResponse
            {
                Id = action.Id,
                CustomerId = action.CustomerId,
                CustomerName = customer.FirstName + " " + customer.LastName,
                ServiceId = action.ServiceId,
                ServiceName = service.Name,
                Date = action.Date,
                Note = action.Note,
                ColorNote = action.ColorNote,
                Price = action.Price,
                CreatedAt = action.CreatedAt
            };
        }
    }
}