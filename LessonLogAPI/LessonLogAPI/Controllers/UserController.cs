using LessonLogAPI.Context;
using LessonLogAPI.Helpers;
using LessonLogAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public UserController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if(userObj == null)
            {
                return BadRequest();
            }

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password == userObj.Password);

            if(user == null)
            {
                return NotFound(new {Message = "User Not Found!"});
            }

            return Ok(new
            {
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj== null)
            {
                return BadRequest();
            }
            
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = "";
            await _dbContext.Users.AddAsync(userObj);
            await _dbContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }
    }
}
