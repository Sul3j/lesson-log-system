

using LessonLogAPI.Models;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IUserService _userService;

        public StudentController(IStudentService studentService, IUserService userService)
        {
            _studentService = studentService;
            _userService = userService;
        }

        [HttpPost("add")]
        public ActionResult AddStudent([FromBody] Student student)
        {
            var students = _studentService.GetStudents();

            foreach (Student s in students)
            {
                if (s.UserId == student.UserId)
                {
                    return BadRequest(new { Message = "This student is exist" });
                }
            }

            _userService.ChangeRole(student.UserId, Roles.STUDENT.GetDisplayName());

            _studentService.AddStudent(student);

            return Ok(new { Message = "Admin has been created" });
        }

        [HttpGet]
        public ActionResult GetAllStudents()
        { 
            var students = _studentService.GetStudents();

            if (students.Count() == 0)
            {
                return Ok(new { Message = "No students to display" });
            }

            return Ok(students);
        }

    }
}
