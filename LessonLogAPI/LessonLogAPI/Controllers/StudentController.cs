using LessonLogAPI.Models;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using Sieve.Models;
using Sieve.Services;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        private readonly IUserService _userService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly IClassService _classService;

        public StudentController(IStudentService studentService, IUserService userService, ISieveProcessor sieveProcessor, IClassService classService)
        {
            _studentService = studentService;
            _userService = userService;
            _sieveProcessor = sieveProcessor;
            _classService = classService;
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

            _userService.ChangeRole((int)student.UserId, Roles.STUDENT.GetDisplayName());

            _studentService.AddStudent(student);

            return Ok(new { Message = "Admin has been created" });
        }



        [HttpGet]
        public ActionResult GetAllStudents()
        { 
            var students = _studentService.GetStudents();

            return Ok(students);
        }

        //[Authorize(Roles = "TEACHER")]
        [HttpPost("pagination")]
        public async Task<PagedResult<StudentDto>> GetStudents([FromBody] SieveModel query)
        {
            var students = _studentService.GetStudents();

            var dtos = await _sieveProcessor
                .Apply(query, students)
                .Select(s => new StudentDto()
                {
                    Id = s.Id,
                    FirstName = s.User.FirstName,
                    LastName = s.User.LastName,
                    Pesel = s.Pesel,
                    PhoneNumber = s.User.PhoneNumber,
                    Email = s.User.Email,
                    ClassName = s.Class.Name,
                    ClassYear = s.Class.Year
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, students, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<StudentDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteStudent([FromRoute] int id)
        {
            var student = _studentService.GetStudent(id);

            if (student == null)
            {
                return BadRequest(new { Message = "This Student is not exist" });
            }

            _userService.ChangeRole((int)student.UserId, Roles.USER.GetDisplayName());

            _studentService.DeleteStudent(id);

            return Ok(new { Message = "Student has been deleted" });
        }

        [HttpPut("edit/{studentId}")]
        public ActionResult EditStudent([FromRoute] int studentId, [FromBody] int newClassId)
        {
            var student = _studentService.GetStudentById(studentId);

            if (student == null)
            {
                return NotFound(new { Message = "Student not found" });
            }

            var newClass = _classService.GetClass(newClassId);

            if (newClass == null)
            {
                return NotFound(new { Message = "Class not found" });
            }

            student.ClassId = newClassId;
            _studentService.UpdateStudent(student);

            return Ok(new { Message = "Student updated successfully" });
        }

    }
}
