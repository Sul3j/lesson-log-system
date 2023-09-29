using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IClassService
    {
        Class AddClass(Class classValue);

        IQueryable<Class> GetClasses();

        Class DeleteClass(int id);

        Class GetClass(int id);
    }
}
