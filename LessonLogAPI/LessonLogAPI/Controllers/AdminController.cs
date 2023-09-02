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
        public ActionResult CreateAdmin([FromBody] Admin admin)
        {
            var admins = _adminService.GetAdmins();

            foreach (Admin a in admins)
            {
                if (a.UserId == admin.UserId)
                {
                    return BadRequest(new { Message = "This admin is exist" });
                }
            }

            _adminService.AddAdmin(admin);

            return Ok(new
            {
                StatusCode = 201,
                Message = "New Admin Created"
            });
        }

        [HttpGet]
        public ActionResult GetAllAdmins()
        {
            var admins = _adminService.GetAdmins();

            return Ok(admins);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAdmin([FromRoute] int id)
        {
            var admin = _adminService.DeleteAdmin(id);

            return Ok(admin);
        }
    }
}
