using Microsoft.EntityFrameworkCore;
namespace HairDesign.App.Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{

}
