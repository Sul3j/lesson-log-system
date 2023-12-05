using LessonLogAPI.Context;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

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

        public IQueryable GetLessonsByClass(int classId)
        {
            var timetableLessons = _dbContext.TimetableLessons
                .Where(l => l.ClassId == classId)
                .Include(l => l.Subject)
                .Include(l => l.Class)
                .Include(l => l.Classroom)
                .Include(l => l.Teacher)
                .ThenInclude(t => t.User)
                .Include(l => l.LessonHour)
                .Select(l => new TimetableLessonDto()
                {
                    Id = l.Id,
                    WeekDay = l.WeekDay,
                    Subject = new SubjectModel()
                    {
                        Id = l.Subject.Id,
                        Name = l.Subject.Name
                    },
                    Class = new ClassModel()
                    {
                        Id = l.Class.Id,
                        Name = l.Class.Name,
                    },
                    Classroom = new ClassroomModel()
                    {
                        Id = l.Classroom.Id,
                        Name = l.Classroom.Name,
                        Floor = l.Classroom.Floor,
                        Number = l.Classroom.Number
                    },
                    Teacher = new TeacherModel()
                    {
                        Id = l.Teacher.Id,
                        User = new UserModel()
                        {
                            Id = l.Teacher.User.Id,
                            FirstName = l.Teacher.User.FirstName,
                            LastName = l.Teacher.User.LastName
                        }
                    },
                    LessonHour = new LessonHourModel()
                    {
                        Id = l.LessonHour.Id,
                        From = l.LessonHour.From,
                        To = l.LessonHour.To,
                    }

                }).AsQueryable();

            return timetableLessons;
        }

        public IQueryable GetLessonsByTeacherId(int teacherId)
        {
            var timetableLessons = _dbContext.TimetableLessons
                .Where(l => l.TeacherId == teacherId)
                .Include(l => l.Subject)
                .Include(l => l.Class)
                .Include(l => l.Classroom)
                .Include(l => l.Teacher)
                .ThenInclude(t => t.User)
                .Include(l => l.LessonHour)
                .Select(l => new TimetableLessonDto()
                {
                    Id = l.Id,
                    WeekDay = l.WeekDay,
                    Subject = new SubjectModel()
                    {
                        Id = l.Subject.Id,
                        Name = l.Subject.Name
                    },
                    Class = new ClassModel()
                    {
                        Id = l.Class.Id,
                        Name = l.Class.Name,
                    },
                    Classroom = new ClassroomModel()
                    {
                        Id = l.Classroom.Id,
                        Name = l.Classroom.Name,
                        Floor = l.Classroom.Floor,
                        Number = l.Classroom.Number
                    },
                    Teacher = new TeacherModel()
                    {
                        Id = l.Teacher.Id,
                        User = new UserModel()
                        {
                            Id = l.Teacher.User.Id,
                            FirstName = l.Teacher.User.FirstName,
                            LastName = l.Teacher.User.LastName
                        }
                    },
                    LessonHour = new LessonHourModel()
                    {
                        Id = l.LessonHour.Id,
                        From = l.LessonHour.From,
                        To = l.LessonHour.To,
                    }

                }).AsQueryable();

            return timetableLessons;
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

        public void UpdateLesson(TimetableLesson lesson)
        {
            var existingLesson = _dbContext.TimetableLessons.FirstOrDefault(t => t.Id == lesson.Id);

            if (existingLesson == null)
            {
                throw new Exception("Lesson not found");
            }

            existingLesson.SubjectId = lesson.SubjectId;
            existingLesson.TeacherId = lesson.TeacherId;
            existingLesson.ClassroomId = lesson.ClassroomId;
            existingLesson.LessonHourId = lesson.LessonHourId;
            

            _dbContext.SaveChanges();
        }


    }
}
