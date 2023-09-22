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
    }
}
