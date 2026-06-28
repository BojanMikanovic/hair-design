using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Users.Commands
{
    public class DeleteUserCommand
    {
        private readonly ApplicationDbContext _context;

        public DeleteUserCommand(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Success, string? Error, bool NotFound)> Execute(Guid id, Guid currentUserId)
        {
            if (id == currentUserId)
                return (false, "Ne možete obrisati svoj vlastiti korisnički račun.", false);

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return (false, null, true);

            var totalUsers = await _context.Users.CountAsync();
            if (totalUsers <= 1)
                return (false, "Ne možete obrisati posljednjeg korisnika.", false);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return (true, null, false);
        }
    }
}
