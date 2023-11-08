using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimetableLessonController : ControllerBase
    {
        private readonly ITimetableLessonService _timetableLessonService;

        public TimetableLessonController(ITimetableLessonService timetableLessonService)
        {
            _timetableLessonService = timetableLessonService;
        }

        [HttpPost("add")]
        public ActionResult AddLesson([FromBody] TimetableLesson lesson)
        {
            _timetableLessonService.AddLesson(lesson);

            return Ok(new { Message = "Lesson has been created" });
        }

        [HttpGet("all")]
        public ActionResult GetAllLessons()
        {
            var lessons = _timetableLessonService.GetLessons();

            if (lessons.Count() == 0)
            {
                return Ok(new { Message = "No lessons to display" });
            }

            return Ok(lessons);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteLesson([FromRoute] int id)
        {
            var lesson = _timetableLessonService.GetLesson(id);

            if (lesson != null)
            {
                return BadRequest(new { Message = "This lesson is not exist" });
            }

            _timetableLessonService.DeleteLesson(id);

            return Ok(new { Message = "Lesson has been deleted" });
        }

        [HttpPut("edit/{lessonId}")]
        public ActionResult EditLesson([FromRoute] int lessonId, [FromBody] TimetableLesson lessonData)
        {
            var lesson = _timetableLessonService.GetLesson(lessonId);

            if(lesson == null)
            {
                return NotFound(new { Message = "Lesson not found" });
            }

            lesson = new TimetableLesson()
            {
                WeekDay = lessonData.WeekDay,
                SubjectId = lessonData.SubjectId,
                TeacherId = lessonData.TeacherId,
                ClassroomId = lessonData.ClassroomId,
                LessonHourId = lessonData.LessonHourId,
                ClassId = lessonData.ClassId,
            };

            _timetableLessonService.UpdateLesson(lesson);

            return Ok(new { Message = "Lesson updated successfully" });
        }
    }
}
