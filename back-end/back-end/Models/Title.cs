namespace back_end.Models
{
    public class Title
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public string synopsis { get; set; } = string.Empty;
        public string releaseDate { get; set; } = string.Empty;
        public string img { get; set; } = string.Empty;

        public int StatusId { get; set; }
        public Status Status { get; set; } 

        public int ContentRatingId { get; set; }
        public ContentRating ContentRating { get; set; }

        public int DemographicId { get; set; }
        public Demographic Demographic { get; set; }

        public ICollection<Author> Author { get; set; } = new List<Author>();
        public ICollection<Artist> Artist { get; set; } = new List<Artist>();

        public ICollection<Genre> Genre { get; set; } = new List<Genre>();
        public ICollection<Theme> Theme { get; set; } = new List<Theme>();
    }
}
