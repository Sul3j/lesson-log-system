using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class AttendaceService
    {

        private readonly AppDbContext _dbContext;

        public AttendaceService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Attendance AddAttendance(Attendance attendance)
        {
            _dbContext.Attendances.Add(attendance);
            _dbContext.SaveChanges();

            return attendance;
        }

        public IQueryable<Attendance> GetAttendances() 
        {
            var attendances = _dbContext.Attendances
                .Include(a => a.Student)
                .Include(a => a.Lesson)
                .AsQueryable();

            return attendances;
        }

        public void UpdateAttendance(Attendance updateAttendance)
        {
            var existingAttendance = _dbContext.Attendances.FirstOrDefault(a => a.Id == updateAttendance.Id);

            if (existingAttendance == null) 
            {
                throw new Exception("Attendance not found");
            }

            existingAttendance.Status = updateAttendance.Status;

            _dbContext.SaveChanges();
        }
    }
}
