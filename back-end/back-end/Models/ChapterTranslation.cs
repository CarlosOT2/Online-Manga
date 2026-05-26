namespace back_end.Models
{
    public class ChapterTranslation
    {
        public int id { get; set; }
        public string? chapterTitle { get; set; }
        public bool isOfficial { get; set; } = false;
        public DateTime uploadedAt { get; set; } = DateTime.UtcNow;
        public int viewCount { get; set; } = 0;

        public int ChapterId { get; set; }
        public Models.Chapter Chapter { get; set; } = null!;

        public int ScanGroupId { get; set; }
        public Models.ScanGroup ScanGroup { get; set; } = null!;

        public int LanguageId { get; set; }
        public Models.Language Language { get; set; } = null!;

        // public ICollection<Models.Page> Page { get; set; } = new List<Models.Page>();
    }
}