using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IStudentService
    {
        List<Student> GetStudents();

        Student AddStudent(Student student);
    }
}
