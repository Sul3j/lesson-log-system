using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _classroomService;
        private readonly ISieveProcessor _sieveProcessor;

        public ClassroomController(IClassroomService classroomService, ISieveProcessor sieveProcessor)
        {
            _classroomService = classroomService;
            _sieveProcessor = sieveProcessor;
        }

        [HttpPost("add")]
        public ActionResult AddClassroom([FromBody] Classroom classroom)
        {
            var classrooms = _classroomService.GetAllClassrooms();

            foreach (Classroom c in classrooms)
            {
                if (c.Number == classroom.Number)
                {
                    return BadRequest(new { Message = "This classroom is exist" });
                }
            }

            _classroomService.AddClassroom(classroom);

            return Ok(new { Message = "Classroom has been created"});
        }

        [HttpGet("all")]
        public ActionResult GetAllClassrooms() 
        {
            var classrooms = _classroomService.GetAllClassrooms();

            return Ok(classrooms);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteClassroom([FromRoute] int id)
        {
            var classroom = _classroomService.GetClassroom(id);

            if (classroom == null)
            {
                return BadRequest(new { Message = "This Classroom is not exist" });
            }

            _classroomService.DeleteClassroom(id);

            return Ok(new { Message = "Classroom has been deleted" });
        }

        [HttpPost("pagination")]
        public async Task<PagedResult<ClassroomDto>> GetClassrooms([FromBody] SieveModel query)
        {
            var classrooms = _classroomService.GetAllClassrooms();

            var dtos = await _sieveProcessor
                .Apply(query, classrooms)
                .Select(c => new ClassroomDto()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Floor = c.Floor,
                    Number = c.Number
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, classrooms, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<ClassroomDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }
    }
}
