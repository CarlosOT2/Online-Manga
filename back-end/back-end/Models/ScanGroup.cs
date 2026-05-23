namespace back_end.Models
{
    public class ScanGroup
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public string? websiteUrl { get; set; }
        public bool isActive { get; set; } = true;

        public ICollection<Models.ChapterTranslation> ChapterTranslation { get; set; } = new List<Models.ChapterTranslation>();
    }
}