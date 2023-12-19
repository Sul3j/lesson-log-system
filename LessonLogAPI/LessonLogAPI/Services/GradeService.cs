using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class GradeService : IGradeService
    {
        private readonly AppDbContext _dbContext;

        public GradeService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Grade AddGrade(Grade grade)
        {
            _dbContext.Add(grade);
            _dbContext.SaveChanges();

            return grade;
        }

        public IQueryable<Grade> GetGrades()
        {
            var grades = _dbContext.Grades
                .Include(g => g.Subject)
                .Include(g => g.Student)
                .AsQueryable();

            return grades;
        }

        public Grade DeleteGrade(int id)
        {
            var grade = _dbContext.Grades.FirstOrDefault(g => g.Id == id);

            if (grade != null)
            {
                _dbContext.Grades.Remove(grade);
            }

            _dbContext.SaveChanges();

            return grade;
        }

        public Grade GetGrade(int id)
        {
            var grade = _dbContext.Grades.FirstOrDefault(g => g.Id == id);

            return grade;
        }

        public IQueryable<Grade> GetGradeByStudentId(int studentId)
        {
            var grades = _dbContext.Grades
                .Where(g => g.StudentId == studentId)
                .Include(g => g.Subject)
                .AsQueryable();

            return grades;
        }

        public void UpdateGrade(Grade grade)
        {
            var existingGrade = _dbContext.Grades.FirstOrDefault(g => g.Id == grade.Id);

            if (existingGrade == null)
            {
                throw new Exception("Grade not found");
            }

            existingGrade.Description = grade.Description;
            existingGrade.GradeValue = grade.GradeValue;
            existingGrade.Percent = grade.Percent;
            existingGrade.GradeWeight = grade.GradeWeight;
            existingGrade.GetDate = DateTime.Now;
            

            _dbContext.SaveChanges();
        }
    }
}
