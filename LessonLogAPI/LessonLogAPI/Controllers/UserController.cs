using LessonLogAPI.Helpers;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using LessonLogAPI.Models.Interfaces;
using LessonLogAPI.Models;
using Microsoft.OpenApi.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _userService.GetUser(userObj);

            if (user == null)
            {
                return BadRequest(new { Message = "This user not exist!" });
            }

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is incorrect!" });
            }

            var tokens = await _userService.Authenticate(userObj);

            return Ok(tokens);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            if (await _userService.CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist!" });
            }

            var pass = _userService.CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass.ToString() });
            }
            
            return Ok(_userService.RegisterUser(userObj));
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetUsers());
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("all")]
        public IActionResult GetAllUsers() 
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenDto tokenDto)
        {
            if (tokenDto is null)
                return BadRequest("Invalid client request");
            string accesToken = tokenDto.AccessToken;
            string refreshToken = tokenDto.RefreshToken;
            var principal = _userService.GetPrincipalFromExpiredToken(accesToken);
            var email = principal.Identity.Name;
            var user = await _userService.GetUserData(email);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid request");
            var newAccessToken = _userService.CreateJwt(user);
            var newRefreshToken = _userService.CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            _userService.SaveChangesAsync();
            return Ok(new TokenDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _userService.GetUserData(email);

            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "email doesn't exist"
                });
            }
          
            return Ok(_userService.SendEmail(email));
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var user = await _userService.ResetPasswordUser(resetPasswordDto);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User doesn't exist"
                });
            }
            var tokenCode = user.ResetPasswordToken;
            DateTime emailTokenExpiry = user.ResetPasswordExpiry;
            if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = "Invalid reset link"
                });
            }
            _userService.ResetPassword(user, resetPasswordDto);
            _userService.SaveChangesAsync();

            return Ok(new
            {
                StatusCode = 200,
                Message = "Password reset successfully"
            });
        }

        [HttpPut("{id}")]
        public ActionResult UpdateRole([FromBody] string role, [FromRoute] int id)
        {
            var user = _userService.GetUserById(id);

            if (user is null)
                return NotFound();

            user.Role = role;

            _userService.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("role/{role}")]
        public ActionResult GetUserByRole([FromRoute] string role)
        {
            switch (role)
            {
                case "USER":
                    return Ok(_userService.GetUsersByRole(Roles.USER));
                case "TEACHER":
                    return Ok(_userService.GetUsersByRole(Roles.TEACHER));
                case "ADMIN":
                    return Ok(_userService.GetUsersByRole(Roles.ADMIN));
                case "STUDENT":
                    return Ok(_userService.GetUsersByRole(Roles.STUDENT));
                case "TUTOR":
                    return Ok(_userService.GetUsersByRole(Roles.TUTOR));
                case "EDUCATOR":
                    return Ok(_userService.GetUsersByRole(Roles.EDUCATOR));
                default:
                    return BadRequest();
            }
        }
    }
}
