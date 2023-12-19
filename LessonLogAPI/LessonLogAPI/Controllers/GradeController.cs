using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using LessonLogAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Services;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly IGradeService _gradeService;
        private readonly ISieveProcessor _sieveProcessor;

        public GradeController(IGradeService gradeService, ISieveProcessor sieveProcessor)
        {
            _gradeService = gradeService;
            _sieveProcessor = sieveProcessor;
        }

        [HttpPost("add")]
        public ActionResult AddGrade([FromBody] Grade grade)
        {
            _gradeService.AddGrade(grade);

            return Ok(new { Message = "Grade has been created" });
        }

        [HttpGet("all")]
        public ActionResult GetAllGrades()
        {
            var grades = _gradeService.GetGrades();

            return Ok(grades);
        }

        [HttpGet("student/{studentId}")]
        public ActionResult GetGradesByStudentId([FromRoute] int studentId)
        {
            var grades = _gradeService.GetGradeByStudentId(studentId);

            return Ok(grades);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteGrade([FromRoute] int id) 
        {
            var grade = _gradeService.GetGrade(id);

            if (grade == null)
            {
                return BadRequest(new { Message = "This Grade is not exist" });
            }

            _gradeService.DeleteGrade(id);

            return Ok(new { Message = "Grade has been deleted" });
        }

        [HttpPut("edit/{gradeId}")]
        public ActionResult EditGrade([FromRoute] int gradeId, [FromBody] Grade gradeData)
        {
            var grade = _gradeService.GetGrade(gradeId);

            if (grade == null)
            {
                return NotFound(new { Message = "Grade not found" });
            }

            grade = new Grade()
            {
                Id = gradeId,
                Description = gradeData.Description,
                GradeValue = gradeData.GradeValue,
                Percent = gradeData.Percent,
                GradeWeight = gradeData.GradeWeight,
                SubjectId = gradeData.SubjectId,
                StudentId = gradeData.StudentId
            };

            _gradeService.UpdateGrade(grade);

            return Ok(new { Message = "Grade updated successfully" });
        }
    }
}
