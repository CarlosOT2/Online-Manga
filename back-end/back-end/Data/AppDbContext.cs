using back_end.Models;
using System.Reflection;
using System.Collections;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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

        public DbSet<T> GetDbSet<T>(string name) where T : class
        {
            DbSet<T>? property =
            this.GetType()
            .GetProperties()
            .FirstOrDefault(p =>
            p.PropertyType == typeof(DbSet<T>) && string.Equals(p.Name, name)
            ).GetValue(this) as DbSet<T>;

            if (property == null)
                throw new InvalidOperationException($"GetDbSet '{name}' not found");

            return property;
        }
        public async Task Seed<T>(string name, int rows, T baseObj) where T : class, new()
        {
            DbSet<T> DbSet = GetDbSet<T>(name);
            List<T> SeedData = new List<T>();


            for (int i = 0; i < rows; i++)
            {
                T item = new T();
                PropertyInfo[] props = typeof(T).GetProperties();

                foreach (var prop in props)
                {
                    if (!prop.CanWrite) continue;

                    if (prop.Name.Equals("id"))
                    {
                        prop.SetValue(item, i + 1);
                    }
                    else if (baseObj != null)
                    {
                        Type type = prop.PropertyType;

                        if (!type.IsValueType && type != typeof(string) && !type.IsGenericType)
                            continue;

                        if (type == typeof(string))
                        {
                            string? value = (string)prop.GetValue(baseObj);
                            if (value != null)
                            {
                                prop.SetValue(item, $"{value}{i + 1}");
                            }
                            else
                            {
                                throw new InvalidOperationException($"Property {prop.Name} value returned null");
                            }
                        }
                        else if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(ICollection<>))
                        {
                            Type itemType = type.GetGenericArguments()[0];

                            PropertyInfo? DbSetProp = this.GetType()
                            .GetProperties()
                            .FirstOrDefault(p =>
                               p.PropertyType.IsGenericType &&
                               p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                               p.PropertyType.GenericTypeArguments[0] == itemType
                            );

                            if (DbSetProp == null)
                                throw new InvalidOperationException($"ICollection<>; Couldn't find DbSet<{itemType.Name}> in DbContext");

                            IEnumerable Current_DbSet = DbSetProp.GetValue(this) as IEnumerable;

                            Random random = new Random();
                            List<object> list = Current_DbSet.Cast<object>().OrderBy(x => Guid.NewGuid()).Take(random.Next(1, 6)).ToList();


                            IList collection = Activator.CreateInstance(typeof(List<>).MakeGenericType(itemType)) as IList;
                            foreach (var listItem in list)
                            {
                                collection.Add(listItem);
                            }

                            prop.SetValue(item, collection);
                        }
                        else if (prop.PropertyType == typeof(int) && prop.Name.EndsWith("Id"))
                        {
                            string navName = prop.Name.Substring(0, prop.Name.Length - 2); 
                            PropertyInfo? navProp = typeof(T).GetProperty(navName);
                            Type navType = navProp.PropertyType;

                            PropertyInfo? DbSetProp = this.GetType()
                                .GetProperties()
                                .FirstOrDefault(p =>
                                    p.PropertyType.IsGenericType &&
                                    p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>) &&
                                    p.PropertyType.GenericTypeArguments[0] == navType
                                );
                            if (DbSetProp == null)
                                throw new InvalidOperationException($"FK_Id; Couldn't find DbSet<{navType.Name}> in DbContext");
                            
                            IEnumerable navDbSet = DbSetProp.GetValue(this) as IEnumerable;
                            object? randomValue = navDbSet.Cast<object>().OrderBy(x => Guid.NewGuid()).FirstOrDefault();
                            if (randomValue == null) continue;

                            PropertyInfo? idProp = navType.GetProperty("id", BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                            if (idProp == null) continue;

                            int randomId = (int)idProp.GetValue(randomValue)!;
                            prop.SetValue(item, randomId);
                        }
                        else
                        {
                            throw new InvalidOperationException($"Unable to handle with type {type}");
                        }
                    }
                }

                SeedData.Add(item);
            }

            DbSet.AddRange(SeedData);
            await SaveChangesAsync();
        }

        public async Task ClearSeed()
        {
            List<Title> TitlesData = await Titles.ToListAsync();
            List<Artist> ArtistsData = await Artists.ToListAsync();
            List<Author> AuthorsData = await Authors.ToListAsync();

            Titles.RemoveRange(TitlesData);
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

