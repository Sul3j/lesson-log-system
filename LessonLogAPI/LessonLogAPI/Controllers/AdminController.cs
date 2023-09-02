using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost("add")]
        public async Task<ActionResult> CreateAdmin([FromBody] Admin admin)
        {
            var admins = _adminService.GetAdmins();

            foreach (Admin a in admins)
            {
                if (a.UserId == admin.UserId)
                {
                    return BadRequest(new { Message = "This admin is exist" });
                }
            }

            await _adminService.AddAdmin(admin);

            return Ok(new
            {
                StatusCode = 201,
                Message = "New Admin Created"
            });
        }

        [HttpGet]
        public ActionResult GetAllAdmins()
        {
            return Ok(_adminService.GetAdmins());
        }
    }
}
