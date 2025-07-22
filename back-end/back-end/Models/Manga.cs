namespace back_end.Models
{
    public class Manga
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string author { get; set; }
        public string synopsis { get; set; }
        public string releaseDate { get; set; }
        public string img { get; set; }


        public Manga()
        {
            name = string.Empty;
            author = string.Empty;
            synopsis = string.Empty;
            releaseDate = string.Empty;
            img = string.Empty;
        }
    }
}
