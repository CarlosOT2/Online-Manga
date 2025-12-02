namespace back_end.Models
{
    public class Artist
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;

        public ICollection<Models.Title> Title { get; set; } = new List<Models.Title>();
    }
}
