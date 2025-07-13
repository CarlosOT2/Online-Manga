using back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace back_end.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Manga> Mangas { get; set; }

    }
}

