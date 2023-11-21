namespace LessonLogAPI.Models.Dto
{
    public class SubjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class TeacherModel 
    {
        public int Id { get; set; }
        public UserModel User { get; set; }
    }

    public class ClassModel
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public string Name { get; set; }
    }

    public class LessonHourModel
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
    }

    public class ClassroomModel
    {
        public int Id { get; set; }
        public int Floor { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
    }

    public class TimetableLessonDto
    {
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public SubjectModel Subject { get; set; }
        public TeacherModel Teacher { get; set; }
        public ClassModel Class { get; set; }
        public LessonHourModel LessonHour { get; set; }
        public ClassroomModel Classroom { get; set; }
    }
}
