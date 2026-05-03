using back_end.DTOs;
using back_end.Shared.Core;

namespace back_end.Database.DbAccess.Interfaces
{
    public interface ITitle
    {

        Task<Result<List<DTOs.Title>>> GetTitleByLimit(int limit);

        Task<Result<List<DTOs.Title>>> GetTitleById(int id);

        Task<Result<List<DTOs.Title>>> GetTitlesByFilters(
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
            );
    }
}
