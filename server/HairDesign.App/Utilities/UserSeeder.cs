using HairDesign.App.Configuration;
using HairDesign.App.Entities;
using HairDesign.App.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace HairDesign.App.Utilities
{
    public static class UserSeeder
    {
        public static void SeedFirstUser(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationDbContext>>();

            if (db.Users.Any()) return;

            var options = scope.ServiceProvider.GetRequiredService<IOptions<FirstUserOptions>>().Value;

            if (string.IsNullOrWhiteSpace(options.Email)
                || string.IsNullOrWhiteSpace(options.Password)
                || string.IsNullOrWhiteSpace(options.FirstName)
                || string.IsNullOrWhiteSpace(options.LastName))
            {
                logger.LogWarning("FirstUser configuration is missing or incomplete; no initial user was seeded.");
                return;
            }

            var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = options.Email.Trim().ToLowerInvariant(),
                FirstName = options.FirstName.Trim(),
                LastName = options.LastName.Trim(),
                PictureUrl = string.IsNullOrWhiteSpace(options.PictureUrl) ? null : options.PictureUrl,
                PasswordHash = "",
                CreatedAt = DateTime.UtcNow,
            };
            user.PasswordHash = hasher.HashPassword(user, options.Password);

            db.Users.Add(user);
            db.SaveChanges();

            logger.LogInformation("Seeded initial user {Email}.", user.Email);
        }
    }
}
