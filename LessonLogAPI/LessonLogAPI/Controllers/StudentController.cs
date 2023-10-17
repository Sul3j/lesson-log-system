

using LessonLogAPI.Models;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        public StudentController(IStudentService studentService, IUserService userService, ISieveProcessor sieveProcessor)
        {
            _studentService = studentService;
            _userService = userService;
            _sieveProcessor = sieveProcessor;
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

    }
}
