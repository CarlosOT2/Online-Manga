namespace back_end.Models
{
    public class Manga
    {
        public int Id { get; set; }
        public string nome { get; set; }
        public string autor { get; set; }
        public string img { get; set; }

        public Manga()
        {
            nome = string.Empty;
            autor = string.Empty;
            img = string.Empty;
        }
    }
}
