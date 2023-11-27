using LessonLogAPI.Context;
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
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        private readonly ISieveProcessor _sieveProcessor;

        public LessonController(ILessonService lessonService, ISieveProcessor sieveProcessor)
        {
            _lessonService = lessonService;
            _sieveProcessor = sieveProcessor;
        }

        [HttpPost("add")]
        public ActionResult AddLesson([FromBody] Lesson lesson)
        { 
            _lessonService.AddLesson(lesson);

            return Ok(new { Message = "Lesson has been created" });
        }

        [HttpGet("all")]
        public ActionResult GetAllLessons()
        {
            var lessons = _lessonService.GetLessons();

            return Ok(lessons);
        }

        [HttpPost("pagination/{teacherId}/{classId}/{subjectId}")]
        public async Task<PagedResult<LessonDto>> GetLessons([FromBody] SieveModel query, [FromRoute] int teacherId, [FromRoute] int classId, [FromRoute] int subjectId)
        {
            var lessons = _lessonService.GetLessonsWithParametrs(teacherId, classId, subjectId);

            var dtos = await _sieveProcessor
                .Apply(query, lessons)
                .Select(l => new LessonDto()
                {
                    Id = l.Id,
                    Topic = l.Topic,
                    SubjectName = l.Subject.Name,
                    ClassYear = l.Class.Year,
                    ClassName = l.Class.Name,
                    Date = l.Date,
                    From = l.LessonHour.From,
                    To = l.LessonHour.To
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, lessons, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<LessonDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteLesson([FromRoute] int id)
        {
            var lesson = _lessonService.GetLesson(id);

            if (lesson == null)
            {
                return BadRequest(new { Message = "This Lesson is not exist" });
            }

            _lessonService.DeleteLesson(id);

            return Ok(new { Message = "Lesson has been deleted" });
        }

        [HttpPut("edit/{lessonId}")]
        public ActionResult EditLesson([FromRoute] int lessonId, [FromBody] Lesson lessonData)
        {
            var lesson = _lessonService.GetLesson(lessonId);

            if (lesson == null)
            {
                return NotFound(new { Message = "Lesson not found" });
            }

            lesson = new Lesson()
            {
                Id = lessonId,
                Topic = lessonData.Topic,
                SubjectId = lessonData.SubjectId,
                TeacherId = lessonData.TeacherId,
                ClassId = lessonData.ClassId
            };

            _lessonService.UpdateLesson(lesson);

            return Ok(new { Message = "Lesson updated successfully" });
        }
    }
}
