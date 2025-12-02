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
            string[]? authors,
            string[]? artists,
            int? publicationYear,
            int[]? statusIds,
            int[]? contentRatingIds,
            int[]? demographicIds,
            int[]? genresIds,
            int[]? themesIds
            );
    }
}
