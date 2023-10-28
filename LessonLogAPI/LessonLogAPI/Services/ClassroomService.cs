using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;

namespace LessonLogAPI.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly AppDbContext _dbContext;

        public ClassroomService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Classroom AddClassroom(Classroom classroom)
        {
            _dbContext.Add(classroom);
            _dbContext.SaveChanges();

            return classroom;
        }

        public IQueryable<Classroom> GetAllClassrooms()
        {
            var classrooms = _dbContext.Classrooms
                .AsQueryable();

            return classrooms;
        }

        public Classroom DeleteClassroom(int id)
        {
            var classroom = _dbContext.Classrooms.FirstOrDefault(c => c.Id == id);

            if (classroom != null)
            {
                _dbContext.Classrooms.Remove(classroom);
            }

            _dbContext.SaveChanges();

            return classroom;
        }

        public Classroom GetClassroom(int id)
        {
            var classroom = _dbContext.Classrooms.FirstOrDefault(c => c.Id == id);

            return classroom;
        }
    }
}
