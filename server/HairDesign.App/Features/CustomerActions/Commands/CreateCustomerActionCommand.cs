using HairDesign.App.Entities;
using HairDesign.App.Features.CustomerActions.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.CustomerActions.Commands
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
            var customer = await _context.Customers
                .FirstOrDefaultAsync(x => x.Id == dto.CustomerId);

            if (customer == null)
                throw new Exception("Customer not found");

            var service = await _context.Services
                .FirstOrDefaultAsync(x => x.Id == dto.ServiceId);

            if (service == null)
                throw new Exception("Service not found");

            var action = new CustomerAction
            {
                Id = Guid.NewGuid(),
                CustomerId = dto.CustomerId,
                ServiceId = dto.ServiceId,
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