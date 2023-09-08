using LessonLogAPI.Models;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TutorController : ControllerBase
    {
        private readonly ITutorService _tutorService;
        private readonly IUserService _userService;

        public TutorController(ITutorService tutorService, IUserService userService)
        {
            _tutorService = tutorService;
            _userService = userService;
        }

        [HttpPost("add")]
        public ActionResult CreateTutor([FromBody] Tutor tutor)
        {
            var tutors = _tutorService.GetTutors();

            foreach (Tutor t in tutors)
            {
                if (t.UserId == tutor.UserId)
                {
                    return BadRequest(new { Message = "This tutor is exist" });
                }
            }

            _userService.ChangeRole((int)tutor.UserId, Roles.TUTOR.GetDisplayName());

            _tutorService.AddTutor(tutor);

            return Ok(new { Message = "Tutor has been created" });
        }

        [HttpGet]
        public ActionResult GetAllTutors()
        {
            var tutors = _tutorService.GetTutors();

            if (tutors.Count() == 0)
            {
                return Ok(new { Message = "No tutors to display" });
            }

            return Ok(tutors);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTutor([FromRoute] int id) 
        {
            Tutor tutor = _tutorService.GetTutor(id);

            if (tutor == null)
            {
                return BadRequest(new { Message = "This Tutor is not exist" });
            }

            _userService.ChangeRole((int)tutor.UserId, Roles.USER.GetDisplayName());

            _tutorService.DeleteTutor(id);

            return Ok(new { Message = "Tutor has been deleted" });
        }
    }
}
