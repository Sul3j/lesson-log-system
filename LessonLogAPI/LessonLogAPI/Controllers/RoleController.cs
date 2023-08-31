using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService) 
        {
            _roleService = roleService;
        }

        [HttpGet]
        public ActionResult<List<Role>> GetAll()
        {
            Console.WriteLine("siema");

            var roles = _roleService.AllRoles();

            return Ok(roles);
        }
    }
}
