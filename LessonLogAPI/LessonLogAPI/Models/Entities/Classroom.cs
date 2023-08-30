using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Classroom
    {
        [Key]
        public int Id { get; set; }
        public int Floor { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
        public TimetableLesson TimetableLesson { get; set; }
    }
}
