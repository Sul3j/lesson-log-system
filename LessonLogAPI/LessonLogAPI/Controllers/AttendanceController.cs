using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Http;
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

        [HttpGet]
        public ActionResult GetAllAttendances()
        {
            var attendances = _attendanceService.GetAttendances();

            return Ok(attendances);
        }
    }
}
