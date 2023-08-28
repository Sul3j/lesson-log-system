namespace LessonLogAPI.Models.Entities
{
    public class Class
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public List<Teacher> Teachers { get; set;}
    }
}
