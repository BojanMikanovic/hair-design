using HairDesign.App.Entities;
using HairDesign.App.Features.Users.Models;
using HairDesign.App.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Users.Commands
{
    public class CreateUserCommand
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _hasher;

        public CreateUserCommand(ApplicationDbContext context, IPasswordHasher<User> hasher)
        {
            _context = context;
            _hasher = hasher;
        }

        public async Task<(UserResponse? Result, string? Error)> Execute(UserCreateDTO dto)
        {
            var email = dto.Email.Trim().ToLowerInvariant();

            if (await _context.Users.AnyAsync(u => u.Email == email))
                return (null, "Korisnik s ovim emailom već postoji.");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                FirstName = dto.FirstName.Trim(),
                LastName = dto.LastName.Trim(),
                PictureUrl = string.IsNullOrWhiteSpace(dto.PictureUrl) ? null : dto.PictureUrl,
                PasswordHash = "",
                CreatedAt = DateTime.UtcNow,
            };
            user.PasswordHash = _hasher.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return (Map(user), null);
        }

        internal static UserResponse Map(User user) => new()
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Initials = (user.FirstName.Length > 0 ? user.FirstName.Substring(0, 1) : "")
                     + (user.LastName.Length > 0 ? user.LastName.Substring(0, 1) : ""),
            PictureUrl = user.PictureUrl,
            CreatedAt = user.CreatedAt,
        };
    }
}
