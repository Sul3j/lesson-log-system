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
    public class SubjectController : ControllerBase 
    {
        private readonly ISubjectService _subjectService;
        private readonly ISieveProcessor _sieveProcessor;

        public SubjectController(ISubjectService subjectService, ISieveProcessor sieveProcessor)
        {
            _subjectService = subjectService;
            _sieveProcessor = sieveProcessor;
        }

        [HttpPost("add")]
        public ActionResult AddSubject([FromBody] Subject subject)
        {
            var subjects = _subjectService.GetSubjects();

            foreach (Subject s in subjects)
            {
                if (s.Name == subject.Name)
                {
                    return BadRequest(new { Message = "This subject is exist" });
                }
            }

            _subjectService.AddSubject(subject);

            return Ok(new { Message = "Subject has been created" });
        }

        [HttpPost("pagination")]
        public async Task<PagedResult<SubjectDto>> GetSubjects([FromBody] SieveModel query)
        {
            var subjects = _subjectService.GetSubjects();

            var dtos = await _sieveProcessor
                .Apply(query, subjects)
                .Select(s => new SubjectDto()
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, subjects, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<SubjectDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteSubject([FromRoute] int id)
        {
            var subject = _subjectService.GetSubject(id);

            if (subject == null)
            {
                return BadRequest(new { Message = "This Subject is not exist" });
            }

            _subjectService.DeleteSubject(id);

            return Ok(new { Message = "Subject has been deleted" });
        }

        [HttpPut("edit/{subjectId}")]
        public ActionResult EditSubject([FromRoute] int subjectId, [FromBody] SubjectDto subjectData)
        {
            var subject = _subjectService.GetSubject(subjectId);

            if (subject == null)
            {
                return NotFound(new { Message = "Subject not found" });
            }

            subject.Name = subjectData.Name;

            _subjectService.UpdateSubject(subject);

            return Ok(new { Message = "Subject updated successfully" });
        }

        [HttpGet("all")]
        public ActionResult GetAllSubjects() 
        {
            var subjects = _subjectService.GetSubjects();

            if (subjects.Count() == 0)
            {
                return Ok(new { Message = "No subjects to display" });
            }

            return Ok(subjects);
        }
    }
}
