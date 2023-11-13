using LessonLogAPI.Models;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using Sieve.Models;
using Sieve.Services;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TutorController : ControllerBase
    {
        private readonly ITutorService _tutorService;
        private readonly IUserService _userService;
        private readonly ISieveProcessor _sieveProcessor;

        public TutorController(ITutorService tutorService, IUserService userService, ISieveProcessor sieveProcessor)
        {
            _tutorService = tutorService;
            _userService = userService;
            _sieveProcessor = sieveProcessor;
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

        [HttpGet("all")]
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

            _tutorService.DeleteTutor(id);

            _userService.ChangeRole((int)tutor.UserId, Roles.USER.GetDisplayName());

            return Ok(new { Message = "Tutor has been deleted" });
        }

        [HttpPost("pagination")]
        public async Task<PagedResult<TutorDto>> GetTutors([FromBody] SieveModel query)
        {
            var tutors = _tutorService.GetTutors();

            var dtos = await _sieveProcessor
                .Apply(query, tutors)
                .Select(t => new TutorDto()
                {
                    Id = t.Id,
                    FirstName = t.User.FirstName,
                    LastName = t.User.LastName,
                    PhoneNumber = t.User.PhoneNumber,
                    Email = t.User.Email
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, tutors, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<TutorDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }
    }
}
