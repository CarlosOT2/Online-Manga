using back_end.Data;
using back_end.Database.DbAccess.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IStatic _dbAccess;

        public AuthorsController(AppDbContext context, IStatic dbAccess)
        {
            _dbAccess = dbAccess;
        }
    }
}
