using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ILessonHourService
    {
        IQueryable<LessonHour> GetAllLessonHour();
    }
}
