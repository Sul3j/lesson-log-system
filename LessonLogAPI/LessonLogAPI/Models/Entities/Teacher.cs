namespace LessonLogAPI.Models.Entities
{
    public class Teacher
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public List<Class> Classes { get; set; }
    }
}
