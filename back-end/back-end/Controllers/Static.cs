using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using back_end.Shared.Core;
using back_end.Shared.Utils;
using back_end.Shared.Cache;
using Microsoft.Extensions.Options;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StaticController : ControllerBase
    {
        private readonly IStatic _dbAccess;
        private readonly CacheHandler _cache;
        private readonly CacheSettings _settings;

        public StaticController(AppDbContext context, IStatic dbAccess, CacheHandler cacheHandler, IOptions<CacheSettings> options)
        {
            _dbAccess = dbAccess;
            _cache = cacheHandler;
            _settings = options.Value;
        }


        [HttpGet]
        public async Task<ActionResult<DTOs.Static>> GetAllStaticData()
        {
            //? Variables
            System.Diagnostics.Debug.WriteLine("Oi53");
            Result<DTOs.Static> result = await _dbAccess.GetAllStaticData();

            if (result.IsFailure)
                return StatusCode(500, "Server Failure");

            string etag = ETag.GenerateETag(result.Value!);
            string clientEtag = Request.Headers["If-None-Match"].FirstOrDefault();

            if (clientEtag != null && clientEtag == etag)
                return StatusCode(StatusCodes.Status304NotModified);

            
            _cache.SetHttpHeaders(Response, result.Value!, _settings.Static.maxage);

            return Ok(result.Value);
        }
    }
}

