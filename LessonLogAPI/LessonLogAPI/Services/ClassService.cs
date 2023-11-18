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

        private void RemoveRoles(IQueryable<Student> students)
        {
            students.ForEachAsync(student =>
            {
                var user = _dbContext.Users.FirstOrDefault(u => u.Id == student.UserId);
                user.Role = Roles.USER.GetDisplayName();
                _dbContext.SaveChanges();
            });
        }

        public Class DeleteClass(int id)
        {
            var classValue = _dbContext.Classes.FirstOrDefault(c => c.Id == id);
            var students = _dbContext.Students.Where(s => s.ClassId == id).AsQueryable();
            RemoveRoles(students);

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
