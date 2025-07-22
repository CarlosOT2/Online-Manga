namespace back_end.Models
{
    public class Status
    {
        public int Id { get; set; }
        public string name { get; set; }
        

        public Status()
        {
            name = string.Empty;
        }
    }
}
