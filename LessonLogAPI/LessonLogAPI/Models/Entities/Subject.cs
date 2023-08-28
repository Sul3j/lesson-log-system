namespace LessonLogAPI.Models.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
        public List<Grade> Grades { get; set; } = new List<Grade>();
    }
}
