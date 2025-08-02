using Microsoft.AspNetCore.Mvc;
using back_end.Models; 
using back_end.Data;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TitleController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public TitleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Title>>> GetAll([FromQuery] int? id, [FromQuery] string? name)
        {
            //? Verifications
            if (id.HasValue ^ !string.IsNullOrEmpty(name))
            {
                return BadRequest("Both queries id and name must have values, otherwise database query will not be performed");
            }

            //? Variables
            IQueryable<Title> query = _context.Titles;

            //? Specific Title
            if (id.HasValue && !string.IsNullOrEmpty(name))
            {
                Title? title = await query
                    .Where(t => t.id == id.Value && t.name == name)
                    .FirstOrDefaultAsync();

                if (title == null)
                    return NotFound();

                return Ok(title);
            }

            //? All Titles
            List<Title> titles = await query.ToListAsync();
            return Ok(titles);
        }
    }
}
