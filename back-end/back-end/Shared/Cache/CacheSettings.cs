namespace back_end.Shared.Cache
{
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