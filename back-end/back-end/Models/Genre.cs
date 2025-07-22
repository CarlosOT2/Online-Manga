namespace back_end.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string name { get; set; }
        

        public Genre()
        {
            name = string.Empty;
        }
    }
}
