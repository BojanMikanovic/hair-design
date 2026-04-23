using HairDesign.App.Features.Users.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Users.Commands
{
    public class UpdateUserCommand
    {
        private readonly ApplicationDbContext _context;

        public UpdateUserCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(UserResponse? Result, string? Error, bool NotFound)> Execute(Guid id, UserUpdateDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return (null, null, true);

            var email = dto.Email.Trim().ToLowerInvariant();

            if (email != user.Email && await _context.Users.AnyAsync(u => u.Email == email && u.Id != id))
                return (null, "Korisnik s ovim emailom već postoji.", false);

            user.Email = email;
            user.FirstName = dto.FirstName.Trim();
            user.LastName = dto.LastName.Trim();
            user.PictureUrl = string.IsNullOrWhiteSpace(dto.PictureUrl) ? null : dto.PictureUrl;

            await _context.SaveChangesAsync();

            return (CreateUserCommand.Map(user), null, false);
        }
    }
}
