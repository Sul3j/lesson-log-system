using LessonLogAPI.Context;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class AttendaceService: IAttendanceService
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

        public IQueryable<Attendance> GetAttendancesByLessonId(int lessonId) 
        {
            var attendances = _dbContext.Attendances
                .Where(a => a.LessonId == lessonId)
                .Include(a => a.Student)
                .ThenInclude(a => a.User)
                .Include(a => a.Lesson)
                .AsQueryable();

            return attendances;
        }

        public Attendance GetAttendanceById(int attendanceId)
        {
            var attendance = _dbContext.Attendances.FirstOrDefault(a => a.Id == attendanceId);
            return attendance;
        }

        public void UpdateAttendance(Attendance attendance)
        {
            var existingAttendance = _dbContext.Attendances.FirstOrDefault(a => a.Id == attendance.Id);

            if (existingAttendance == null) 
            {
                throw new Exception("Attendance not found");
            }

            existingAttendance.Status = attendance.Status;

            _dbContext.SaveChanges();
        }
    }
}
