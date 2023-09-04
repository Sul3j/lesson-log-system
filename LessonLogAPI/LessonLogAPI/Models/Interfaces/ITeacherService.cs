using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ITeacherService
    {
        Task<Teacher> AddTeacher(Teacher teacher);

        List<Teacher> GetTeachers();

        Teacher DeleteTeacher(int id);
    }
}
