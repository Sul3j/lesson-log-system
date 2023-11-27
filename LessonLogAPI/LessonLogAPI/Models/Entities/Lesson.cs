using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }
        public string Topic { get; set; }
        public Teacher Teacher { get; set; }
        public int TeacherId { get; set; }
        public Subject Subject { get; set; }
        public int? SubjectId { get; set; }
        public Class Class { get; set; }
        public int? ClassId { get; set; }
        public LessonHour LessonHour { get; set; }
        public int? LessonHourId { get; set; }
        public DateTime Date { get; set; }
        public List<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
}
