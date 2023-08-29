using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string Pesel { get; set; }
        public List<Attendance> Attendances { get; set; } = new List<Attendance>();
        public List<Grade> Grades { get; set; } = new List<Grade>();
        public Class Class { get; set; }
        public int ClassId { get; set; }
    }
}
