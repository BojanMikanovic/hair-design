using HairDesign.App.Entities;
using HairDesign.App.Features.Users.Models;
using HairDesign.App.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Users.Commands
{
    public class ResetPasswordCommand
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _hasher;

        public ResetPasswordCommand(ApplicationDbContext context, IPasswordHasher<User> hasher)
        {
            _context = context;
            _hasher = hasher;
        }

        public async Task<bool> Execute(Guid id, PasswordResetDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return false;

            user.PasswordHash = _hasher.HashPassword(user, dto.NewPassword);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
