namespace back_end.Models
{
    public class ContentRating
    {
        public int Id { get; set; }
        public string name { get; set; }
        

        public ContentRating()
        {
            name = string.Empty;
        }
    }
}
