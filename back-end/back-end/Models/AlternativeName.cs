namespace back_end.Models
{
    public class AlternativeName
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;

        public int LanguageId { get; set; }
        public Models.Language Language { get; set; } = null!;

        public int TitleId { get; set; }
        public Models.Title Title { get; set; } = null!;
    }
}
