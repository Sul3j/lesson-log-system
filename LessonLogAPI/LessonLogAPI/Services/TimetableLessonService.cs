using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class TimetableLessonService : ITimetableLessonService
    {
        private readonly AppDbContext _dbContext;

        public TimetableLessonService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TimetableLesson AddLesson(TimetableLesson lesson)
        {
            _dbContext.Add(lesson);
            _dbContext.SaveChanges();

            return lesson;
        }

        public IQueryable<TimetableLesson> GetLessons()
        {
            var lessons = _dbContext.TimetableLessons
                .Include(l => l.Subject)
                .Include(l => l.Teacher)
                .Include(l => l.Classroom)
                .Include(l => l.LessonHour)
                .AsQueryable();

            return lessons;
        }

        public TimetableLesson DeleteLesson(int id)
        {
            var lesson = _dbContext.TimetableLessons.FirstOrDefault(t => t.Id == id);

            if (lesson != null)
            {
                _dbContext.TimetableLessons.Remove(lesson);
            }

            _dbContext.SaveChanges();

            return lesson;
        }

        public TimetableLesson GetLesson(int id)
        {
            var lesson = _dbContext.TimetableLessons.FirstOrDefault(t => t.Id == id);

            return lesson;
        }
    }
}
