using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Swashbuckle.AspNetCore.Newtonsoft;

namespace LessonLogAPI.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly AppDbContext _dbContext;

        public SubjectService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Subject AddSubject(Subject subject)
        {
            _dbContext.Subjects.Add(subject);
            _dbContext.SaveChanges();

            return subject;
        }

        public IQueryable<Subject> GetSubjects()
        {
            var subjects = _dbContext.Subjects
                .AsQueryable();

            return subjects;
        }

        public Subject DeleteSubject(int id)
        {
            var subject = _dbContext.Subjects.FirstOrDefault(s => s.Id == id);

            if (subject != null)
            {
                _dbContext.Subjects.Remove(subject);
                
            }

            _dbContext.SaveChanges();

            return subject;
        }

        public Subject GetSubject(int id)
        {
            var subject = _dbContext.Subjects.FirstOrDefault(s => s.Id == id);

            return subject;
        }

        public void UpdateSubject(Subject newData)
        {
            var subject = _dbContext.Subjects.FirstOrDefault(s => s.Id == newData.Id);

            if (subject == null)
            {
                throw new Exception("Subject not found");
            }

            subject = new Subject()
            {
                Name = newData.Name,
            };

            _dbContext.SaveChanges();
        }
    }
}
