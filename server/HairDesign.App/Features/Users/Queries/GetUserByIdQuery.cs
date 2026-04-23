using HairDesign.App.Features.Users.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Users.Queries
{
    public class GetUserByIdQuery
    {
        private readonly ApplicationDbContext _context;

        public GetUserByIdQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserResponse?> Execute(Guid id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return null;

            return new UserResponse
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
}
