using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Services;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;
        private readonly ISieveProcessor _sieveProcessor;

        public ClassController(IClassService classService, ISieveProcessor sieveProcessor)
        {
            _classService = classService;
            _sieveProcessor = sieveProcessor;
        }

        [HttpPost("add")]
        public ActionResult CreateClass([FromBody] Class classValue)
        {
            _classService.AddClass(classValue);

            return Ok(new { Message = "Class has been created " });
        }
    }
}
