using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService) 
        {
            _teacherService = teacherService;
        }

        [HttpPost("add")]
        public async Task<ActionResult> CreateTeacher([FromBody] Teacher teacher) 
        {
            await _teacherService.AddTeacher(teacher);

            return Ok(new
            {
                StatusCode = 201,
                Message = "New Teacher Created"
            });
        }

        [HttpGet]
        public ActionResult GetAllTeachers()
        {
            return Ok(_teacherService.GetTeachers());
        }
    }
}
