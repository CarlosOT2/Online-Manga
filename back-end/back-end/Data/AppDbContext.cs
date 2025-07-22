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
        public DbSet<Author> Authors { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Demographic> Demographics { get; set; }
        public DbSet<ContentRating> ContentRatings { get; set; }
        public DbSet<Status> Statuses { get; set; }

        public DbSet<T> GetDbSet<T>(string name) where T : class
        {
            var property =
            this.GetType()
            .GetProperties()
            .FirstOrDefault(p =>
            p.PropertyType == typeof(DbSet<T>) && string.Equals(p.Name, name)
            );

            if (property == null)
                throw new InvalidOperationException($"GetDbSet '{name}' not found");

            return (DbSet<T>)property.GetValue(this);
        }
        public async Task Seed<T>(string name, int rows, T baseObj) where T : class, new()
        {
            DbSet<T> DbSet = GetDbSet<T>(name);
            if (await DbSet.AnyAsync())
            {
                List<T> MangasData = await DbSet.ToListAsync();
                DbSet.RemoveRange(MangasData);
            }

            List<T> SeedData = new List<T>();

            for (int i = 0; i < rows; i++)
            {
                var item = new T();
                var props = typeof(T).GetProperties();

                foreach (var prop in props)
                {
                    if (!prop.CanWrite) continue;

                    if (prop.Name.Equals("Id"))
                    {
                        prop.SetValue(item, i + 1);
                    }
                    else if (baseObj != null)
                    {
                        string value = (string)prop.GetValue(baseObj);
                        prop.SetValue(item, $"{value}{i + 1}");
                    }
                }

                SeedData.Add(item);
            }

            DbSet.AddRange(SeedData);
            await SaveChangesAsync();
        }
        public async Task ClearSeed()
        {
            List<Manga> MangasData = await Mangas.ToListAsync();
            List<Artist> ArtistsData = await Artists.ToListAsync();
            List<Author> AuthorsData = await Authors.ToListAsync();
            
            Mangas.RemoveRange(MangasData);
            Artists.RemoveRange(ArtistsData);
            Authors.RemoveRange(AuthorsData);

            await SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.BaseSeed();
        }
    }
}

