using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using back_end.Models; 
using back_end.Data;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Mangas : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public Mangas(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Manga>>> GetAll()
        {
            var mangas = await _context.Mangas.ToListAsync();
            return Ok(mangas);
        }


    }
}
