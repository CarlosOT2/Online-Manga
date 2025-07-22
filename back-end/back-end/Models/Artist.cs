namespace back_end.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string name { get; set; }
        

        public Author()
        {
            name = string.Empty;
        }
    }
}
