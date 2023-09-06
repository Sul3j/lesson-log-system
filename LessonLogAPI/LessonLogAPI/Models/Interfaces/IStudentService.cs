using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IStudentService
    {
        Student AddStudent(Student student);
        List<Student> GetStudents();
    }
}
