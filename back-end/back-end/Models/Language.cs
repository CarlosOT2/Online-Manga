namespace back_end.Models
{
    public class Language
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty; // "pt-br", "en", "es"
        public ICollection<Models.ChapterTranslation> ChapterTranslation { get; set; } = new List<Models.ChapterTranslation>();
        // public ICollection<Models.AlternativeName> AlternativeNames { get; set; } = new List<Models.AlternativeName>();

    }
}
