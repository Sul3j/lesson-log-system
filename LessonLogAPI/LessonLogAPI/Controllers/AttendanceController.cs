using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpPost("add")]
        public ActionResult AddAttendance([FromBody] Attendance attendance)
        {
            _attendanceService.AddAttendance(attendance);

            return Ok(new { Message = "Attendance has been created" });
        }

        [HttpGet("{lessonId}")]
        public ActionResult GetAllAttendancesByLessonId([FromRoute] int lessonId)
        {
            var attendances = _attendanceService.GetAttendancesByLessonId(lessonId);

            return Ok(attendances);
        }

        [HttpPut("edit/{attendanceId}")]
        public ActionResult EditAttendance([FromRoute] int attendanceId, [FromBody] AttendanceDto dto )
        {

            Console.WriteLine(dto.Status);

            Console.WriteLine(dto.Status);

            var attendance = _attendanceService.GetAttendanceById(attendanceId);

            if (attendance == null)
            {
                return NotFound(new { Message = "Attendance not found" });
            }

            attendance.Status = dto.Status;
            _attendanceService.UpdateAttendance(attendance);

            return Ok(new { Message = "Attendance updated successfully" });
        }
    }
}
