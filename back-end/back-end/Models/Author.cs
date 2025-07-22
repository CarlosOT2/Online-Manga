namespace back_end.Models
{
    public class Artist
    {
        public int Id { get; set; }
        public string name { get; set; }
        

        public Artist()
        {
            name = string.Empty;
        }
    }
}
