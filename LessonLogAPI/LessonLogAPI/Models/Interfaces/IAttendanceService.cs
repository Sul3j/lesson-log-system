using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IAttendanceService
    {
        Attendance AddAttendance(Attendance attendance);

        IQueryable<Attendance> GetAttendances();

        void UpdateAttendance(Attendance updateAttendance);
    }
}
