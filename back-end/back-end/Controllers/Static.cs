using Microsoft.AspNetCore.Mvc;
using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using back_end.Shared.Core;
using back_end.Shared.Utils;
using back_end.Shared.Cache;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StaticController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IStatic _dbAccess;
        private readonly CacheHandler _cacheHandler;

        public StaticController(AppDbContext context, IStatic dbAccess, CacheHandler cacheHandler)
        {
            _context = context;
            _dbAccess = dbAccess;
            _cacheHandler = cacheHandler;
        }


        [HttpGet]
        public async Task<ActionResult<DTOs.Static>> GetAllStaticData()
        {
            //? Variables
            Result<DTOs.Static> result = await _dbAccess.GetAllStaticData();
            
            if (result.IsFailure)
                return StatusCode(500, "Server Failure");

            string etag = ETag.GenerateETag(result.Value!);
            string clientEtag = Request.Headers["If-None-Match"].FirstOrDefault();

            if (clientEtag != null && clientEtag == etag)
                return StatusCode(StatusCodes.Status304NotModified);

            _cacheHandler.SetHttpStaticCache(Response, result.Value!);

            return Ok(result.Value);
        }
    }
}

