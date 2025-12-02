namespace back_end.DTOs
{
    public class Title
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public string synopsis { get; set; } = string.Empty;
        public DateTime publicationDate { get; set; } = DateTime.MinValue;
        public string img { get; set; } = string.Empty;

        public int Status { get; set; } = -1;
        public int ContentRating { get; set; } = -1;
        public int Demographic { get; set; } = -1;

        public List<int> genres { get; set; } = new();
        public List<int> themes { get; set; } = new();
        public List<string> authors { get; set; } = new();
        public List<string> artists { get; set; } = new();

    }
}
