using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;

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
    }
}
