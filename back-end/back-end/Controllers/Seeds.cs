using back_end.Data;
using Microsoft.AspNetCore.Mvc;
using back_end.Database.DbAccess;

namespace back_end.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Seeds : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly DbSeeds _DbSeeds;

        public Seeds(AppDbContext context)
        {
            _context = context;
            _DbSeeds = new DbSeeds(context); 
        }

        [HttpPost("Static")]
        public async Task<IActionResult> Static()
        {
            await _DbSeeds.Static();
            return Ok("Seed executed");
        }

        [HttpPost("Seed")]
        public async Task<IActionResult> Seed([FromBody] int rows = 500)
        {
            await _DbSeeds.Clear("Titles");
            await _DbSeeds.Clear("Artists");
            await _DbSeeds.Clear("Authors");

            await _DbSeeds.Run<Models.Title>("Titles", rows, new Models.Title {
                name = "Manga",    
                synopsis = "A 34-year-old NEET gets killed in a traffic accident and finds himself in a world of magic. " +
                "Rather than waking up as a full-grown mage, he gets reincarnated as a newborn baby, retaining the memories of his past life. " +
                "Before he can even properly move his body, " +
                "he resolves to never make the same mistakes he made in his first life ever again and instead live a life with no regrets with the new one that was given " +
                "to him. Because he has the knowledge of a middle-aged man, by the age of two, he has already become a prodigy and possesses power unthinkable for " +
                "anyone his age and even older. Thus begins the chronicles of Rudeus Greyrat, son of swordsman Paul and healer Zenith, as he enters a new world to " +
                "become the strongest mage known to man, with powers rivaling even the gods themselves.",
                // this prop will generate random dates starting from this date
                publicationDate = new DateTime(2000, 1, 1, 0, 0, 0),
                img = "image",
            });
            await _DbSeeds.Run<Models.Artist>("Artists", rows, new Models.Artist { name = "Artist" });
            await _DbSeeds.Run<Models.Author>("Authors", rows, new Models.Author { name = "Author" });

            return Ok("Seed executed");
        }

        [HttpDelete]
        public async Task<IActionResult> Clear()
        {
            await _DbSeeds.Clear();
            return Ok("Successfully Cleaned");
        }
    }
}
