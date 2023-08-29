using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Class
    {
        [Key]
        public int Id { get; set; }
        public int Year { get; set; }
        public List<Teacher> Teachers { get; set; }
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
        public List<Student> Students { get; set; } = new List<Student>();
    }
}
