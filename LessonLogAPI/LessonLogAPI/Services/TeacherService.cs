using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly AppDbContext _dbContext;

        public TeacherService(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public Teacher AddTeacher(Teacher teacher)
        { 
            _dbContext.Teachers.Add(teacher);
            _dbContext.SaveChanges();

            return teacher;
        }

        public IQueryable<Teacher> GetTeachers()
        {
            var teachers = _dbContext.Teachers
                .Include(t => t.User)
                .Include(t => t.Class)
                .AsQueryable();

            return teachers;
        }

        public Teacher DeleteTeacher(int id)
        {
            var teacher = _dbContext.Teachers.FirstOrDefault(t => t.Id == id);

            var timetable = _dbContext.TimetableLessons
                .Where(t => t.TeacherId == id)
                .AsQueryable();

            var classValue = _dbContext.Classes
                .Where(c => c.EducatorId == id)
                .AsQueryable();


            if (teacher != null)
            {
                _dbContext.Teachers.Remove(teacher);

                foreach (var item in timetable)
                {
                    item.TeacherId = null;
                }

                foreach (var item in classValue)
                {
                    item.EducatorId = null;
                }
            }

            _dbContext.SaveChanges();

            return teacher;
        }

        public Teacher GetTeacher(int id)
        {
            var teacher = _dbContext.Teachers.FirstOrDefault(a => a.Id == id);

            return teacher;
        }

        public Teacher GetTeacherByEmail(string email)
        {
            var teacher = _dbContext.Teachers.FirstOrDefault(t => t.User.Email == email);

            return teacher;
        }
    }
}
