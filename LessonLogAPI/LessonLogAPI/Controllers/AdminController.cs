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
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IUserService _userService;
        private readonly ISieveProcessor _sieveProcessor;

        public AdminController(IAdminService adminService, IUserService userService, ISieveProcessor sieveProcessor)
        {
            _adminService = adminService;
            _userService = userService;
            _sieveProcessor = sieveProcessor;
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

            var isUserExist = _userService.isUserCheck((int)admin.UserId);

            if (isUserExist != null)
            {
                return BadRequest(isUserExist);
            }

            _userService.ChangeRole((int)admin.UserId, Roles.ADMIN.GetDisplayName());

            _adminService.AddAdmin(admin);

            return Ok(new { Message = "Admin has been created" });
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteAdmin([FromRoute] int id)
        {
            var admin = _adminService.GetAdmin(id);

            if (admin == null)
            {
                return BadRequest(new { Message = "This Admin is not exist" });
            } 

            _userService.ChangeRole((int)admin.UserId, Roles.USER.GetDisplayName());

            _adminService.DeleteAdmin(id);

            return Ok(new { Message = "Admin has been deleted" });
        }

        [HttpPost("pagination")]
        public async Task<PagedResult<AdminDto>> GetAdmins([FromBody] SieveModel query)
        {
            var admins = _adminService.GetAdmins();

            var dtos = await _sieveProcessor
                .Apply(query, admins)
                .Select(a => new AdminDto()
                {
                    Id = a.Id,
                    FirstName = a.User.FirstName,
                    LastName = a.User.LastName,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(query, admins, applyPagination: false, applySorting: false)
                .CountAsync();

            var result = new PagedResult<AdminDto>(dtos, totalCount, query.Page.Value, query.PageSize.Value);

            return result;
        }
    }
}
