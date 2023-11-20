using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonHoursController : ControllerBase
    {
        private readonly ILessonHourService _lessonHourService;

        public LessonHoursController(ILessonHourService lessonHourService) 
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
