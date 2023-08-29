namespace LessonLogAPI.Models.Entities
{
    public class Tutor
    {
        public int Id { get; set; }
        public List<Student> Students { get; set; } = new List<Student>();
        public User User { get; set; }
        public int? UserId { get; set; }
    }
}
