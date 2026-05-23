using back_end.Models;

namespace back_end.Shared.Settings
{
    public class AppSettings
    {
        public DatabaseSettings Database { get; set; }
        public CacheSettings CacheSettings { get; set; }
    }
    
    public class DatabaseSettings
    {
        public TablesSettings Tables { get; set; }
    }
    public class TablesSettings
    {
        public ValidationSettings Validation { get; set; }
    }
    public class ValidationSettings
    {
        public TitleValidation Title { get; set; }
        public ChapterValidation Chapter { get; set; }
        public ChapterTranslationValidation ChapterTranslation { get; set; }
        public PageValidation Page { get; set; }
        public AlternativeNameValidation AlternativeName { get; set; }
    }
    
    public class TitleValidation
    {
        public int NameMaxLength { get; set; }
        public int SynopsisMaxLength { get; set; }
        public int ImgMaxLength { get; set; }
    }
    public class ChapterValidation
    {
        public double NumberMax { get; set; }
    }
    public class ChapterTranslationValidation
    {
        public int ChapterTitleMaxLength { get; set; }
    }
    public class PageValidation
    {
        public int ImageUrlMaxLength { get; set; }
    }
    public class AlternativeNameValidation
    {
        public int ValueMaxLength { get; set; }
    }

    public class CacheSettings
    {
        public StaticCacheSettings Static { get; set; } = new();
    }
    public class StaticCacheSettings
    {
        public int maxage { get; set; }
        public string key { get; set; } = string.Empty;
    }
}