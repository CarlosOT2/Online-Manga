namespace back_end.Models
{
    public class Theme
    {
        public int Id { get; set; }
        public string name { get; set; }
        

        public Theme()
        {
            name = string.Empty;
        }
    }
}
