using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public List<Class> Classes { get; set; }
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}
