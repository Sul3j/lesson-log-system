using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class TutorService : ITutorService
    {
        private readonly AppDbContext _dbContext;

        public TutorService(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public IQueryable<Tutor> GetTutors()
        {
            var tutors = _dbContext.Tutors
                .Include(t => t.User)
                .Include(t => t.Students)
                .AsQueryable();

            return tutors;
        }

        public Tutor AddTutor(Tutor tutor)
        {
            _dbContext.Tutors.Add(tutor);
            _dbContext.SaveChanges();

            return tutor;
        }

        public Tutor DeleteTutor(int id)
        {
            var tutor = GetTutor(id);

            var student = _dbContext.Students.FirstOrDefault(student => student.TutorId == tutor.Id);

            if (student != null)
            {
                student.TutorId = null;
            }

            if (tutor != null)
            {
                _dbContext.Tutors.Remove(tutor);
            }

            _dbContext.SaveChanges();

            return tutor;
        }

        public Tutor GetTutor(int id)
        {
            var tutor = _dbContext.Tutors.FirstOrDefault(t => t.Id == id);

            return tutor;
        }

        public Tutor GetTutorByEmail(string email)
        {
            var tutor = _dbContext.Tutors.FirstOrDefault(s => s.User.Email == email);

            return tutor;
        }
    }
}
