using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using back_end.Shared.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Collections.Generic;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TitleController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITitle _dbAccess;

        public TitleController(AppDbContext context, ITitle dbAccess)
        {
            _context = context;
            _dbAccess = dbAccess;
        }

        [HttpGet]
        public async Task<ActionResult<List<DTOs.Title>>> GetTitle([FromQuery] int? id, [FromQuery] int? limit)
        {

            System.Diagnostics.Debug.WriteLine("Title");
            //? Verifications
            if (!id.HasValue && !limit.HasValue)
                return BadRequest("You must provide at least one parameter: 'id' or 'limit'.");

            //? Variables
            Result<List<DTOs.Title>> result = id.HasValue
                ? await _dbAccess.GetTitleById(id.Value)
                : await _dbAccess.GetTitleByLimit(limit!.Value);

            if (result.IsFailure)
                return StatusCode(500, "Server Failure");

            if (result.Value!.Count <= 0 && id.HasValue)
                return NotFound();

            return Ok(result.Value);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<DTOs.Title>>> SearchTitle(
            [FromQuery] string? name,
            [FromQuery] string[]? authors,
            [FromQuery] string[]? artists,
            [FromQuery] int[]? genresIds,
            [FromQuery] int[]? themesIds,
            [FromQuery] int? publicationYear,
            [FromQuery] int? statusId,
            [FromQuery] int? demographicId,
            [FromQuery] int? contentRatingId
            )
        {
            Result<List<DTOs.Title>> result = await _dbAccess.GetTitlesByFilters(
                name,
                authors,
                artists,
                genresIds,
                themesIds,
                publicationYear,
                demographicId,
                statusId,
                contentRatingId
                );

            if (result.IsFailure)
                return StatusCode(500, "Server Failure");

            return result.Value;
        }
    }
}
