using back_end.Models;
using Microsoft.EntityFrameworkCore;
using back_end.Shared.Core;
using back_end.Shared.Settings;
using Microsoft.Extensions.Options;


namespace back_end.Data
{
    public class AppDbContext : DbContext
    {
        private readonly ValidationSettings _validation;

        public AppDbContext(DbContextOptions<AppDbContext> options, IOptions<ValidationSettings> validation) : base(options)
        {
            _validation = validation.Value;
        }

        public DbSet<Title> Titles { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Artist> Artists { get; set; }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Demographic> Demographics { get; set; }
        public DbSet<ContentRating> ContentRatings { get; set; }
        public DbSet<Status> Statuses { get; set; }

        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<ChapterTranslation> ChapterTranslations { get; set; }
        public DbSet<ScanGroup> ScanGroups { get; set; }
        // public DbSet<Page> Pages { get; set; }

        public DbSet<AlternativeName> AlternativeNames { get; set; }
        public DbSet<Language> Languages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chapter>(e =>
            {
                e.HasIndex(c => new { c.TitleId, c.number }).IsUnique();
                e.Property(c => c.number).HasColumnType("decimal(5,1)");
                e.ToTable(c => c.HasCheckConstraint("CK_ChapterNumber", "number >= 0"));
            });

            modelBuilder.Entity<ChapterTranslation>(e =>
            {
                e.HasIndex(ct => new { ct.ChapterId, ct.ScanGroupId, ct.LanguageId }).IsUnique();
                e.Property(ct => ct.chapterTitle).HasMaxLength(_validation.ChapterTranslation.ChapterTitleMaxLength);
                e.ToTable(ct => ct.HasCheckConstraint("CK_ChapterTranslation_ViewCount", "\"viewCount\" >= 0"));
            });

            /*
            modelBuilder.Entity<Page>(e =>
            {
                e.HasIndex(p => new { p.ChapterTranslationId, p.pageNumber }).IsUnique();
                e.Property(p => p.imageUrl).HasMaxLength(_validation.Page.ImageUrlMaxLength);
                e.ToTable(p => p.HasCheckConstraint("CK_PageNumber", "\"pageNumber\" >= 0"));
            });
            */
            modelBuilder.Entity<Title>(e =>
            {
                e.Property(t => t.name).IsRequired().HasMaxLength(_validation.Title.NameMaxLength);
                e.HasIndex(t => t.name).IsUnique();
                e.Property(t => t.synopsis).IsRequired().HasMaxLength(_validation.Title.SynopsisMaxLength);
                e.Property(t => t.img).IsRequired().HasMaxLength(_validation.Title.ImgMaxLength);
            });
            modelBuilder.Entity<AlternativeName>(e =>
            {
                e.Property(e => e.name).IsRequired().HasMaxLength(_validation.AlternativeName.ValueMaxLength);
                // Prevent cascading delete: deleting a Language should not remove AlternativeNames
                e.HasOne(e => e.Language)
                      .WithMany()
                      .HasForeignKey(e => e.LanguageId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

        }


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

