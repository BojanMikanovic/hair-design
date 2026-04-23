using HairDesign.App.Features.Users.Models;
using HairDesign.App.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HairDesign.App.Features.Users.Queries
{
    public class GetAllUsersQuery
    {
        private readonly ApplicationDbContext _context;

        public GetAllUsersQuery(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserResponse>> Execute()
        {
            return await _context.Users
                .OrderBy(x => x.LastName)
                .ThenBy(x => x.FirstName)
                .Select(x => new UserResponse
                {
                    Id = x.Id,
                    Email = x.Email,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Initials = (x.FirstName.Length > 0 ? x.FirstName.Substring(0, 1) : "")
                             + (x.LastName.Length > 0 ? x.LastName.Substring(0, 1) : ""),
                    PictureUrl = x.PictureUrl,
                    CreatedAt = x.CreatedAt,
                })
                .ToListAsync();
        }
    }
}
