using HairDesign.App.Entities;
using HairDesign.App.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Auth.Commands
{
    public class LoginCommand
    {
        private readonly ApplicationDbContext _db;
        private readonly IPasswordHasher<User> _hasher;

        public LoginCommand(ApplicationDbContext db, IPasswordHasher<User> hasher)
        {
            _db = db;
            _hasher = hasher;
        }

        public async Task<User?> Execute(string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrEmpty(password)) return null;

            var normalized = email.Trim().ToLowerInvariant();
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == normalized);
            if (user == null) return null;

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result == PasswordVerificationResult.Failed) return null;

            if (result == PasswordVerificationResult.SuccessRehashNeeded)
            {
                user.PasswordHash = _hasher.HashPassword(user, password);
                await _db.SaveChangesAsync();
            }

            return user;
        }
    }
}
