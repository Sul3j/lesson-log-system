using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IAttendanceService
    {
        Attendance AddAttendance(Attendance attendance);

        IQueryable<Attendance> GetAttendancesByLessonId(int lessonId);

        void UpdateAttendance(Attendance attendance);

        Attendance GetAttendanceById(int attendanceId);
    }
}
