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

        public List<Teacher> GetTeachers()
        {
            var teachers = _dbContext.Teachers
                .Include(t => t.User)
                .ToList();

            return teachers;
        }

        public Teacher DeleteTeacher(int id)
        {
            var teacher = _dbContext.Teachers.FirstOrDefault(t => t.Id == id);

            if (teacher != null)
            {
                _dbContext.Teachers.Remove(teacher);
            }

            _dbContext.SaveChanges();

            return teacher;
        }

        public Teacher GetTeacher(int id)
        {
            var teacher = _dbContext.Teachers.FirstOrDefault(a => a.Id == id);

            return teacher;
        }
    }
}
