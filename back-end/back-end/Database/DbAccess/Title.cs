using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using back_end.Shared.Core;

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
            string[]? authors,
            string[]? artists,
            int[]? genresIds,
            int[]? themesIds,
            int? publicationYear,
            int? demographicId,
            int? statusId,
            int? contentRatingId
            )
        {
            try
            {
                IQueryable<DTOs.Title> query = BuildQuery();

                //? Name
                if (!string.IsNullOrWhiteSpace(name))
                    query = query.Where(t => EF.Functions.ILike(t.name, $"%{name}%"));

                //? Authors
                if (authors?.Length >= 1)
                    query = query.Where(t => authors.All(a => t.authors.Any(aut => EF.Functions.ILike(aut, "%" + a + "%"))));

                //? Artists
                if (artists?.Length >= 1)
                    query = query.Where(t => artists.All(a => t.artists.Any(art => EF.Functions.ILike(art, "%" + a + "%"))));

                //? Genres
                if (genresIds?.Length >= 1)
                    query = query.Where(t => genresIds.All(id => t.genres.Contains(id)));

                //? Themes
                if (themesIds?.Length >= 1)
                    query = query.Where(t => themesIds.All(id => t.themes.Contains(id)));

                //? Publication Year
                if (publicationYear.HasValue)
                    query = query.Where(t => t.publicationDate.Year == publicationYear.Value);

                //? Demographic
                if (demographicId.HasValue)
                    query = query.Where(t => t.Demographic == demographicId.Value);

                //? Status
                if (statusId.HasValue)
                    query = query.Where(t => t.Status == statusId.Value);

                //? Content Rating
                if (contentRatingId.HasValue)
                    query = query.Where(t => t.ContentRating == contentRatingId.Value);

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
