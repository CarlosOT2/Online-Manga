using System.Xml.Linq;
using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Seeds : ControllerBase
    {
        private readonly AppDbContext _context;

        public Seeds(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Seed([FromBody] int rows = 500)
        {
            await _context.Seed<Manga>("Mangas", rows, new Manga {
                name = "Manga",
                author = "Author",
                synopsis = "synopsis",
                releaseDate = "releaseDate",
                img = "image",
            });
            await _context.Seed<Artist>("Artists", rows, new Artist { name = "Artist" });
            await _context.Seed<Author>("Authors", rows, new Author { name = "Author" });

            return Ok("Seed executed");
        }

        [HttpDelete]
        public async Task<IActionResult> Clear()
        {
            await _context.ClearSeed();
            return Ok("Successfully Cleaned");
        }
    }
}
