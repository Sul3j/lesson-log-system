using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IStudentService
    {
        IQueryable<Student> GetStudents();

        Student AddStudent(Student student);

        Student GetStudent(int id);

        void UpdateStudent(Student updatedStudent);

        Student GetStudentById(int studentId);

        Student DeleteStudent(int id);
    }
}
