using LessonLogAPI.Models;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;
        private readonly IUserService _userService;

        public TeacherController(ITeacherService teacherService, IUserService userService) 
        {
            _teacherService = teacherService;
            _userService = userService;
        }

        [HttpPost("add")]
        public ActionResult CreateTeacher([FromBody] Teacher teacher) 
        {
            var teachers = _teacherService.GetTeachers();

            foreach (Teacher t in teachers)
            {
                if (t.UserId == teacher.UserId)
                {
                    return BadRequest(new { Message = "This teacher is exist" });
                }
            }

            _userService.ChangeRole(teacher.UserId, ((int)RolesNames.TEACHER) + 1);

            _teacherService.AddTeacher(teacher);

            return Ok(new { Message = "Teacher has been created" });
        }

        [HttpGet]
        public ActionResult GetAllTeachers()
        {
            var teachers = _teacherService.GetTeachers();

            if (teachers.Count() == 0)
            {
                return Ok(new { Message = "No teachers to display" });
            }

            return Ok(teachers);
        }
    }
}
