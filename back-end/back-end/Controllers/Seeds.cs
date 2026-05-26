using back_end.Data;
using Microsoft.AspNetCore.Mvc;
using back_end.Database.DbAccess;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Intrinsics.X86;

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

        // Chapter seeding is done manually because each title requires multiple chapters
        // with unique and ordered numbers — something that couldn't be easily implemented
        // in the generic DbSeeds.Run<T>() method.
        private async Task SeedChapters()
        {
            Random random = Random.Shared;
            List<Models.Title> titles = await _context.Titles.ToListAsync();
            List<Models.Chapter> chapters = new List<Models.Chapter>()!;

            int id = 1;
            foreach (Models.Title title in titles)
            {
                int totalChapters = random.Next(1, 201);
                SortedSet<decimal> chapterNumbers = new SortedSet<decimal>()!;

                while (chapterNumbers.Count < totalChapters)
                {
                    double roll = random.NextDouble();
                    decimal number = roll < 0.05 ? random.Next(151, 201)
                                   : roll < 0.25 ? random.Next(51, 151)
                                   : random.Next(1, 51);

                    decimal fraction = random.NextDouble() < 0.7 ? 0m : random.Next(1, 10) / 10m;
                    chapterNumbers.Add(number + fraction);
                }

                foreach (decimal number in chapterNumbers)
                    chapters.Add(new Models.Chapter { id = id++, TitleId = title.id, number = number });
            }

            _context.Chapters.AddRange(chapters);
            await _context.SaveChangesAsync();
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
            await _DbSeeds.Clear();
            await _DbSeeds.Static();

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
            await _DbSeeds.Run<Models.AlternativeName>("AlternativeNames", rows, new Models.AlternativeName { name = "Alternative Name" });
            await _DbSeeds.Run<Models.ScanGroup>("ScanGroups", rows, new Models.ScanGroup { name = "ScanGroup", websiteUrl = "teste" });
            await SeedChapters();
            await _DbSeeds.Run<Models.ChapterTranslation>("ChapterTranslations", rows, new Models.ChapterTranslation { chapterTitle = "Teste" });

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
