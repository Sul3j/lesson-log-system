using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class ClassService : IClassService
    {
        private readonly AppDbContext _dbContext;

        public ClassService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Class AddClass(Class classValue)
        {
            _dbContext.Add(classValue);
            _dbContext.SaveChanges();

            return classValue;
        }
        
        public IQueryable<Class> GetClasses() 
        {
            var classes = _dbContext.Classes
                .Include(c => c.Teacher)
                .AsQueryable();

            return classes;
        }

        public Class DeleteClass(int id)
        {
            var classValue = _dbContext.Classes.FirstOrDefault(c => c.Id == id);

            if (classValue != null)
            {
                _dbContext.Classes.Remove(classValue);
            }

            _dbContext.SaveChanges();

            return classValue;
        }

        public Class GetClass(int id)
        {
            var classValue = _dbContext.Classes.FirstOrDefault(c => c.Id == id);

            return classValue;
        }
    }
}
