namespace LessonLogAPI.Models.Dto
{
    public class ClassDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public string EducatorFullName { get; set; }
        public int? EducatorId { get; set; }
    }
}
