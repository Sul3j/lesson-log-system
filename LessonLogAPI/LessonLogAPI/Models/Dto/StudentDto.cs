namespace LessonLogAPI.Models.Dto
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Pesel { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int ClassYear { get; set; }
        public string ClassName { get; set; }
        public string TutorFirstName { get; set; }
        public string TutorLastName { get; set; }
        public int? ClassId { get; set; }
    }
}
