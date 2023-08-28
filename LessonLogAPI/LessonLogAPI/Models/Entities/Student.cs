namespace LessonLogAPI.Models.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public string Pesel { get; set; }
        public List<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
}
