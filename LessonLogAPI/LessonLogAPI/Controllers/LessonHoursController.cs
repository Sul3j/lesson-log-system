using LessonLogAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonHoursController : ControllerBase
    {
        private readonly LessonHourService _lessonHourService;

        public LessonHoursController(LessonHourService lessonHourService) 
        { 
            _lessonHourService = lessonHourService;
        }

        [HttpGet("all")]
        public ActionResult GetAllLessonHours()
        {
            var lessonHours = _lessonHourService.GetAllLessonHour();

            return Ok(lessonHours);
        }
    }
}
