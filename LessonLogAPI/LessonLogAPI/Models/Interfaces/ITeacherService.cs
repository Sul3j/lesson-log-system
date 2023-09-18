using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ITeacherService
    {
        Teacher AddTeacher(Teacher teacher);

        IQueryable<Teacher> GetTeachers();

        Teacher DeleteTeacher(int id);

        Teacher GetTeacher(int id);
    }
}
