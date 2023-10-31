using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ITimetableLessonService
    {
        TimetableLesson AddLesson(TimetableLesson lesson);

        IQueryable<TimetableLesson> GetLessons();

        TimetableLesson DeleteLesson(int id);

        TimetableLesson GetLesson(int id);
    }
}
