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

        public async Task<Teacher> AddTeacher(Teacher teacher)
        { 
            await _dbContext.Teachers.AddAsync(teacher);
            await _dbContext.SaveChangesAsync();

            return teacher;
        }

        public List<Teacher> GetTeachers()
        {
            var teachers = _dbContext.Teachers
                .Include(t => t.User)
                .ToList();

            return teachers;
        }
    }
}
