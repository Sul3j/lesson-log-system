using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;
        private readonly ISieveProcessor _sieveProcessor;
        private readonly ITeacherService _teacherService;

        public ClassController(IClassService classService, ISieveProcessor sieveProcessor, ITeacherService teacherService)
        {
            _classService = classService;
            _sieveProcessor = sieveProcessor;
            _teacherService = teacherService;
        }

        [HttpPost("add")]
        public ActionResult CreateClass([FromBody] Class classValue)
        {
            _classService.AddClass(classValue);

            return Ok(new { Message = "Class has been created " });
        }

        [HttpPost("pagination")]
        public async Task<PagedResult<ClassDto>> GetClasses([FromBody] SieveModel query)
        {
            var classes = _classService.GetClasses();

            var dtos = await _sieveProcessor
                .Apply(query, classes)
                .Select(c => new ClassDto()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Year = c.Year,
                    EducatorFullName = c.Teacher.User.FirstName + " " + c.Teacher.User.LastName,
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, classes, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<ClassDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }



        [HttpGet("all")]
        public ActionResult AllCLasses() 
        {
            var classes = _classService.GetClasses();

            return Ok(classes);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteClass([FromRoute] int id)
        {
            var classValue = _classService.GetClass(id);

            if (classValue == null)
            {
                return BadRequest(new { Message = "This Class is not exist" });
            }

            _classService.DeleteClass(id);

            return Ok(new { Message = "Class has been deleted"});
        }

        [HttpGet("{id}")]
        public ActionResult GetClassById([FromRoute] int id)
        {
            var classValue = _classService.GetClass(id);

            if (classValue == null)
            {
                return NotFound(new { Message = "Class not found" });
            }

            return Ok(classValue);
        }

        [HttpPut("edit/{classId}")]
        public ActionResult EditClass([FromRoute] int classId, [FromBody] EditClassDto classDto)
        {
            var classValue = _classService.GetClass(classId);

            if (classValue == null)
            {
                return NotFound(new { Message = "Class not found" });
            }

            var educator = _teacherService.GetTeacher(classDto.EducatorId);

            if (educator == null)
            {
                return NotFound(new { Message = "Educator not found" });
            }

            classValue.EducatorId = classDto.EducatorId;
            classValue.Name = classDto.Name;
            classValue.Year = classDto.Year;

            _classService.UpdateClass(classValue);

            return Ok(new { Message = "Class updated successfully" });
        }
    }
}
