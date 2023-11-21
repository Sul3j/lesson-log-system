using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class TimetableLesson
    {
        [Key]
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public Subject Subject { get; set; }
        public int? SubjectId { get; set; }
        public Teacher Teacher { get; set; }
        public int? TeacherId { get; set; }
        public Classroom Classroom { get; set; }
        public int? ClassroomId { get; set; }
        public LessonHour LessonHour { get; set; }
        public int? LessonHourId { get; set; }
        public Class Class { get; set; }
        public int? ClassId { get; set; }
    }
}
