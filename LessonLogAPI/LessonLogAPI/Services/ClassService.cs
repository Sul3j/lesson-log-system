using LessonLogAPI.Context;
using LessonLogAPI.Models;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

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
            var student = _dbContext.Students.FirstOrDefault(s => s.ClassId == id);
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == student.UserId);

            if (student != null)
            {
                student.ClassId = null;
                user.Role = Roles.USER.GetDisplayName();
            }

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

        public void UpdateClass(Class updateClass)
        {
            var existingClass = _dbContext.Classes.FirstOrDefault(c => c.Id == updateClass.Id);

            if (existingClass == null)
            {
                throw new Exception("Class not found");
            }

            existingClass = new Class()
            {
                Name = updateClass.Name,
                Year = updateClass.Year,
                EducatorId = updateClass.EducatorId
            };

            _dbContext.SaveChanges();
        }
    }
}
