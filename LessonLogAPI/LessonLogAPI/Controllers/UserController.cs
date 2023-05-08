﻿using LessonLogAPI.Context;
using LessonLogAPI.Helpers;
using LessonLogAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

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
            if (userObj == null)
            {
                return BadRequest();
            }

            if (await CheckEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist!"});
            }

            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass)) 
            {
                return BadRequest(new { Message = pass.ToString() });
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

        private Task<bool> CheckEmailExistAsync(string email)
            => _dbContext.Users.AnyAsync(x => x.Email == email);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if(password.Length < 8)
            {
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            }

            if(!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            }

            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
            {
                sb.Append("Password should contain special chars" + Environment.NewLine);
            }

            return sb.ToString();
        }
        
    }
}
