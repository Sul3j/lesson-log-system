using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Grade
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public int GradeValue { get; set; }
        public int? Percent { get; set; }
        public int GradeWeight { get; set; }
        public DateTime GetDate { get; set; }
        public Subject Subject { get; set; }
        public int? SubjectId { get; set; }
        public Student Student { get; set; }
        public int? StudentId { get; set; }
    }
}
