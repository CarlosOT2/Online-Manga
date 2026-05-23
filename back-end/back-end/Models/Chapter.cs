namespace back_end.Models
{
    public class Chapter
    {
        public int id { get; set; }
        public int TitleId { get; set; }
        public decimal number { get; set; }

        public Models.Title Title { get; set; } = null!;
        public ICollection<Models.ChapterTranslation> ChapterTranslation { get; set; } = new List<Models.ChapterTranslation>();
    }
}