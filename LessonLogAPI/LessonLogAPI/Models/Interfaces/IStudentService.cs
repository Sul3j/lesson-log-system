using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IStudentService
    {
        IQueryable<Student> GetStudents();

        Student AddStudent(Student student);

        Student GetStudent(int id);
    }
}
