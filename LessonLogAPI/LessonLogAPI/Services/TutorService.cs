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

        public List<Tutor> GetTutors()
        {
            var tutors = _dbContext.Tutors
                .Include(t => t.User)
                .ToList();

            return tutors;
        }

        public Tutor AddTutor(Tutor tutor)
        {
            _dbContext.Tutors.Add(tutor);
            _dbContext.SaveChanges();

            return tutor;
        }
    }
}
