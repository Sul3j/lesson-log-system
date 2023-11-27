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
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;
        private readonly IUserService _userService;
        private readonly ISieveProcessor _sieveProcessor;

        public TeacherController(ITeacherService teacherService, IUserService userService, ISieveProcessor sieveProcessor) 
        {
            _teacherService = teacherService;
            _userService = userService;
            _sieveProcessor = sieveProcessor;
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

            var isUserExist = _userService.isUserCheck((int)teacher.UserId);

            if (isUserExist != null)
            {
                return BadRequest(isUserExist);
            }

            _userService.ChangeRole((int)teacher.UserId, Roles.TEACHER.GetDisplayName());

            _teacherService.AddTeacher(teacher);

            return Ok(new { Message = "Teacher has been created" });
        }

        [HttpGet("all")]
        public ActionResult GetAllTeachers()
        {
            var teachers = _teacherService.GetTeachers();

            return Ok(teachers);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTeacher([FromRoute] int id)
        {
            var teacher = _teacherService.GetTeacher(id);

            if (teacher == null)
            {
                return BadRequest(new { Message = "This Teacher is not exist" });
            }

            _userService.ChangeRole((int)teacher.UserId, Roles.USER.GetDisplayName());

            _teacherService.DeleteTeacher(id);

            return Ok(new { Message = "Teacher has been deleted" });
        }

        [HttpPost("pagination")]
        public async Task<PagedResult<TeacherDto>> GetTeachers([FromBody] SieveModel query)
        {
            var teachers = _teacherService.GetTeachers();

            var dtos = await _sieveProcessor
                .Apply(query, teachers)
                .Select(t => new TeacherDto()
                {
                    Id = t.Id,
                    FirstName = t.User.FirstName,
                    LastName = t.User.LastName
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, teachers, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<TeacherDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }

        [HttpGet("email/{email}")]
        public Teacher GetTeacherByEmail([FromRoute] string email)
        {
            var teacher = _teacherService.GetTeacherByEmail(email);

            return teacher;
        }
    }
}
