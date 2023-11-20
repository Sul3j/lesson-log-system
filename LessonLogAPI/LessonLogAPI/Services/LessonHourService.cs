using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;

namespace LessonLogAPI.Services
{
    public class LessonHourService : ILessonHourService
    {
        private readonly AppDbContext _dbContext;
        
        public LessonHourService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<LessonHour> GetAllLessonHour()
        {
            var lessonHours = _dbContext.LessonHours.AsQueryable();

            return lessonHours;
        } 
    }
}
