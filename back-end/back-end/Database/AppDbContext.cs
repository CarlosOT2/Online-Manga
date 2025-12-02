using back_end.Models;
using Microsoft.EntityFrameworkCore;
using back_end.Shared.Core;


namespace back_end.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Title> Titles { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Demographic> Demographics { get; set; }
        public DbSet<ContentRating> ContentRatings { get; set; }
        public DbSet<Status> Statuses { get; set; }

        public Result<object> GetDbSet(string name)
        {
            object? property = this
                .GetType()
                .GetProperties()
                .FirstOrDefault(p => string.Equals(p.Name, name, StringComparison.OrdinalIgnoreCase))!
                .GetValue(this);

            if (property == null)
                return Result<object>.Failure($"GetDbSet '{name}' not found");

            return Result<object>.Success(property);
        }
        public Result<DbSet<T>> GetDbSet<T>(string name) where T : class
        {
            Result<object> result = GetDbSet(name);

            if (result.IsFailure)
                return Result<DbSet<T>>.Failure(result.Message!);

            if (result.Value is DbSet<T> typed)
                return Result<DbSet<T>>.Success(typed);

            return Result<DbSet<T>>.Failure(
                $"DbSet '{name}' is not DbSet<{typeof(T).Name}>."
            );
        }
    }
}

