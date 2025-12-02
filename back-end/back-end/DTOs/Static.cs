namespace back_end.DTOs
{
    public class Static
    {
        public List<StaticItemDTO> statuses { get; set; } = new();
        public List<StaticItemDTO> contentRatings { get; set; } = new();
        public List<StaticItemDTO> demographics { get; set; } = new();
        public List<StaticItemDTO> genres { get; set; } = new();
        public List<StaticItemDTO> themes { get; set; } = new();
    }
}
