using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using back_end.Shared.Core;
using back_end.Models;
using System.Diagnostics;

namespace back_end.Database.DbAccess
{
    public class Title : ITitle
    {
        private readonly AppDbContext _context;

        public Title(AppDbContext context)
        {
            _context = context;
        }

        private IQueryable<DTOs.Title> BuildQuery()
        {
            return _context.Titles
            .AsNoTracking()
            .AsSplitQuery()
            .Select(t => new DTOs.Title
            {
                id = t.id,
                name = t.name,
                synopsis = t.synopsis,
                publicationDate = t.publicationDate,
                img = t.img,

                Status = t.Status.id,
                ContentRating = t.ContentRating.id,
                Demographic = t.Demographic.id,

                authors = t.Author.Select(a => a.name),
                artists = t.Artist.Select(a => a.name),
                genres = t.Genre.Select(g => g.id),
                themes = t.Theme.Select(th => th.id)
            });
        }

        private async Task<List<DTOs.Title>> RunQuery(IQueryable<DTOs.Title> query)
        {
            return await query.ToListAsync();
        }

        public async Task<Result<List<DTOs.Title>>> GetTitleByLimit(int limit)
        {
            try
            {
                IQueryable<DTOs.Title> query = BuildQuery();
                query = query.Take(limit);
                List<DTOs.Title> titles = await RunQuery(query);
                return Result<List<DTOs.Title>>.Success(titles);
            }
            catch (Exception ex)
            {
                return Result<List<DTOs.Title>>.Failure(ex.Message);
            }
        }

        public async Task<Result<List<DTOs.Title>>> GetTitleById(int id)
        {
            try
            {
                IQueryable<DTOs.Title> query = BuildQuery();
                query = query.Where(t => t.id == id);
                List<DTOs.Title> title = await RunQuery(query);

                return Result<List<DTOs.Title>>.Success(title);
            }
            catch (Exception ex)
            {
                return Result<List<DTOs.Title>>.Failure(ex.Message);
            }
        }
        public async Task<Result<List<DTOs.Title>>> GetTitlesByFilters(
            string? name,
            string? author,
            string? artist,

            int[]? genresIds,
            int[]? themesIds,
            int[]? demographicIds,
            int[]? statusIds,
            int[]? contentRatingIds,
            int? publicationYear,

            int[]? excludeGenresIds,
            int[]? excludeThemesIds
            )
        {
            try
            {
                //? Variables
                IQueryable<DTOs.Title> query = BuildQuery();

                //? Verification
                IEnumerable<int> conflictingGenres = genresIds?.Intersect(excludeGenresIds ?? []) ?? [];
                IEnumerable<int> conflictingThemes = themesIds?.Intersect(excludeThemesIds ?? []) ?? [];

                if (conflictingGenres.Any() || conflictingThemes.Any())
                    return Result<List<DTOs.Title>>.Failure("Invalid filters: same id cannot be included and excluded simultaneously");

                //# Include
                //? Name
                if (!string.IsNullOrWhiteSpace(name))
                    query = query.Where(t => EF.Functions.ILike(t.name, $"%{name}%"));

                //? Author
                if (!string.IsNullOrWhiteSpace(author))
                    query = query.Where(t => t.authors.Any(aut => EF.Functions.ILike(aut, $"%{author}%")));

                //? Artist
                if (!string.IsNullOrWhiteSpace(artist))
                    query = query.Where(t => t.artists.Any(art => EF.Functions.ILike(art, $"%{artist}%")));

                //? Genres
                if (genresIds?.Length >= 1)
                    query = query.Where(t => genresIds.All(id => t.genres.Contains(id)));

                //? Themes
                if (themesIds?.Length >= 1)
                    query = query.Where(t => themesIds.All(id => t.themes.Contains(id)));

                //? Demographic
                if (demographicIds?.Length >= 1)
                    query = query.Where(t => demographicIds.Contains(t.Demographic));

                //? Status
                if (statusIds?.Length >= 1)
                    query = query.Where(t => statusIds.Contains(t.Status));

                //? Content Rating
                if (contentRatingIds?.Length >= 1)
                    query = query.Where(t => contentRatingIds.Contains(t.ContentRating));

                //? Publication Year
                if (publicationYear.HasValue)
                    query = query.Where(t => t.publicationDate.Year == publicationYear.Value);

                //# Exclude 
                if (excludeGenresIds?.Length >= 1)
                    query = query.Where(t => !excludeGenresIds.Any(id => t.genres.Contains(id)));

                if (excludeThemesIds?.Length >= 1)
                    query = query.Where(t => !excludeThemesIds.Any(id => t.themes.Contains(id)));

                List<DTOs.Title> titles = await RunQuery(query);
                return Result<List<DTOs.Title>>.Success(titles);
            }
            catch (Exception ex)
            {
                return Result<List<DTOs.Title>>.Failure(ex.Message);
            }
        }
    }
}
