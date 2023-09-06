using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _dbContext;

        public StudentService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Student AddStudent(Student student)
        {
            _dbContext.Students.Add(student);
            _dbContext.SaveChanges();

            return student;
        }

        public List<Student> GetStudents() 
        {
            var students = _dbContext.Students
                .Include(s => s.User)
                .ToList();

            return students;
        }
    }
}
