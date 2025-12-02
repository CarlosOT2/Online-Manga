namespace back_end.Models
{
    public class Title
    {
        public int id { get; set; }
        public string name { get; set; } = string.Empty;
        public string synopsis { get; set; } = string.Empty;
        public DateTime publicationDate { get; set; } = DateTime.MinValue;
        public string img { get; set; } = string.Empty;

        public int StatusId { get; set; }
        public Models.Status Status { get; set; } 

        public int ContentRatingId { get; set; }
        public Models.ContentRating ContentRating { get; set; }

        public int DemographicId { get; set; }
        public Models.Demographic Demographic { get; set; }

        public ICollection<Models.Author> Author { get; set; } = new List<Models.Author>();
        public ICollection<Models.Artist> Artist { get; set; } = new List<Models.Artist>();

        public ICollection<Models.Genre> Genre { get; set; } = new List<Models.Genre>();
        public ICollection<Models.Theme> Theme { get; set; } = new List<Models.Theme>();
    }
}
