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

        public IEnumerable<int> genres { get; set; } = new List<int>();
        public IEnumerable<int> themes { get; set; } = new List<int>();
        public IEnumerable<string> authors { get; set; } = new List<string>();
        public IEnumerable<string> artists { get; set; } = new List<string>();

    }
}
