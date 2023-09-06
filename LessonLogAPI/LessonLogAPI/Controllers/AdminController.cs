using LessonLogAPI.Models;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IUserService _userService;

        public AdminController(IAdminService adminService, IUserService userService)
        {
            _adminService = adminService;
            _userService = userService;
        }

        [HttpPost("add")]
        public ActionResult AddAdmin([FromBody] Admin admin)
        {
            var admins = _adminService.GetAdmins();

            foreach (Admin a in admins)
            {
                if (a.UserId == admin.UserId)
                {
                    return BadRequest(new { Message = "This admin is exist" });
                }
            }

            _userService.ChangeRole(admin.UserId, Roles.ADMIN.GetDisplayName());

            _adminService.AddAdmin(admin);

            return Ok(new { Message = "Admin has been created" });
        }

        [HttpGet]
        public ActionResult GetAllAdmins()
        {
            var admins = _adminService.GetAdmins();

            if (admins.Count() == 0)
            {
                return Ok(new { Message = "No admins to display" });
            }

            return Ok(admins);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAdmin([FromRoute] int id)
        {
            var admin = _adminService.GetAdmin(id);

            if (admin == null)
            {
                return BadRequest(new { Message = "This Admin is not exist" });
            } 

            _userService.ChangeRole(admin.UserId, Roles.USER.GetDisplayName());

            _adminService.DeleteAdmin(id);

            return Ok(new { Message = "Admin has been deleted" });
        }
    }
}
