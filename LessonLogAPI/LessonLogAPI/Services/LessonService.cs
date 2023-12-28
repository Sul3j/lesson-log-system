using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            lesson.Date = DateTime.Now;

            _dbContext.Add(lesson);
            _dbContext.SaveChanges();

            return lesson;
        }

        public IQueryable<Lesson> GetLessons()
        {
            var lessons = _dbContext.Lessons
                .Include(l => l.Class)
                .Include(l => l.Subject)
                .Include(l => l.Teacher)
                .Include(l => l.LessonHour)
                .AsQueryable();

            return lessons;
        }

        public IQueryable<Lesson> GetLessonsWithParametrs(int teacherId, int classId, int subjectId)
        {
           var lessons = _dbContext.Lessons
               .Where(l => l.TeacherId == teacherId && l.ClassId == classId && l.SubjectId == subjectId)
               .Include(l => l.Class)
               .Include(l => l.Subject)
               .Include(l => l.Teacher)
               .AsQueryable();

           return lessons;
        }

        public IQueryable<Lesson> GetLessonsByClassId(int classId)
        {
            var lessons = _dbContext.Lessons
                .Where(l => l.ClassId == classId)
                .Include(l => l.Attendances)
                .ThenInclude(a => a.Student)
                .Include(l => l.Subject)
                .Include(l => l.Teacher)
                .Include(l => l.LessonHour)
                .AsQueryable();

            return lessons;
        }

        public Lesson DeleteLesson(int id)
        {
            var lesson = _dbContext.Lessons.FirstOrDefault(l => l.Id == id);

            if (lesson != null)
            {
                _dbContext.Attendances.RemoveRange(lesson.Attendances);
                _dbContext.Lessons.Remove(lesson);
                _dbContext.SaveChanges();
            }

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

            existingLesson.LessonHour = lesson.LessonHour;
            existingLesson.Topic = lesson.Topic;

            _dbContext.SaveChanges();
        }
    }
}
