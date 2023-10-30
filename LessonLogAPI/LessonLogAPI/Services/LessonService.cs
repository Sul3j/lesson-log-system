using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;

namespace LessonLogAPI.Services
{
    public class LessonService : ILessonService
    {
        private readonly AppDbContext _dbContext;

        public LessonService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Lesson AddLesson(Lesson lesson)
        {
            _dbContext.Add(lesson);
            _dbContext.SaveChanges();

            return lesson;
        }

        public IQueryable<Lesson> GetLessons()
        {
            var lessons = _dbContext.Lessons
                .AsQueryable();

            return lessons;
        }

        public Lesson DeleteLesson(int id)
        {
            var lesson = _dbContext.Lessons.FirstOrDefault(l => l.Id == id);

            if (lesson != null)
            {
                _dbContext.Lessons.Remove(lesson);
            }

            _dbContext.SaveChanges();

            return lesson;
        }

        public Lesson GetLesson(int id)
        {
            var lesson = _dbContext.Lessons.FirstOrDefault(l => l.Id == id);

            return lesson;
        }

        public void UpdateLesson(Lesson lesson)
        {
            var existingLesson = _dbContext.Lessons.FirstOrDefault(l => l.Id == lesson.Id);

            if (existingLesson == null)
            {
                throw new Exception("Lesson not found");
            }

            existingLesson = new Lesson()
            {
                Topic = lesson.Topic,
                TeacherId = lesson.TeacherId,
                SubjectId = lesson.SubjectId,
                ClassId = lesson.ClassId
            };

            _dbContext.SaveChanges();
        }
    }
}
