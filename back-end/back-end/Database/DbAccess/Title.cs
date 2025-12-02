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

        private IQueryable<DTOs.Title> GetQueryDTO()
        {
            IQueryable<DTOs.Title> queryDTO = _context.Titles
            .AsNoTracking()
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

                authors = t.Author.Select(a => a.name).ToList(),
                artists = t.Artist.Select(a => a.name).ToList(),
                genres = t.Genre.Select(g => g.id).ToList(),
                themes = t.Theme.Select(th => th.id).ToList()
            });

            return queryDTO;
        }

        public async Task<Result<List<DTOs.Title>>> GetTitleByLimit(int limit)
        {
            try
            {
                IQueryable<DTOs.Title> query = GetQueryDTO();
                List<DTOs.Title> titles = await query.Take(limit).ToListAsync();
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
                IQueryable<DTOs.Title> query = GetQueryDTO();
                List<DTOs.Title> title = await query
                        .Where(t => t.id == id)
                        .ToListAsync();
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
            int? publicationYear,
            int[]? statusIds,
            int[]? contentRatingIds,
            int[]? demographicIds,
            int[]? genresIds,
            int[]? themesIds
            )
        {
            try
            {
                //? Variables
                IQueryable<DTOs.Title> query = GetQueryDTO();

                //? Name
                if (!string.IsNullOrEmpty(name))
                    query = query.Where(t => t.name.Contains(name));

                //? Publication Year
                if (publicationYear.HasValue)
                {
                    int year = publicationYear.Value;
                    query = query.Where(t => t.publicationDate.Year == year);
                }
                //? Authors
                if (authors != null && authors.Length >= 1)
                    query = query.Where(t => t.authors.Any(a => authors.Contains(a)));
                
                //? Artists
                if (artists != null && artists.Length >= 1)
                    query = query.Where(t => t.artists.Any(a => artists.Contains(a)));
                

                List<DTOs.Title> titles = await query.ToListAsync();

                return Result<List<DTOs.Title>>.Success(titles);
            }
            catch (Exception ex)
            {
                return Result<List<DTOs.Title>>.Failure(ex.Message);
            }
        }
    }
}
