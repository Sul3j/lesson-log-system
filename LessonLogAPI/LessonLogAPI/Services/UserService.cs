using LessonLogAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Text;
using LessonLogAPI.Context;
using LessonLogAPI.Models.Interfaces;
using LessonLogAPI.UtilityService;
using LessonLogAPI.Models.Dto;
using LessonLogAPI.Helpers;
using LessonLogAPI.Models;
using Microsoft.OpenApi.Extensions;

namespace LessonLogAPI.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;

        public UserService(AppDbContext dbContext, IConfiguration config, IEmailService emailService) 
        {
            _dbContext = dbContext;
            _config = config;
            _emailService = emailService;
        }

        public async Task<User> GetUser(User userObj)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Email == userObj.Email);

            return user;
        }

        public async Task<TokenDto> Authenticate(User userObj)
        {
            var user = await GetUser(userObj);
            user.Token = CreateJwt(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _dbContext.SaveChangesAsync();

            return new TokenDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public Task<bool> CheckEmailExistAsync(string email)
           => _dbContext.Users.AnyAsync(x => x.Email == email);

        public string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if (password.Length < 8)
            {
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            }

            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
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

        public async Task<object> RegisterUser(User userObj)
        {
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Token = "";
            await _dbContext.Users.AddAsync(userObj);
            await _dbContext.SaveChangesAsync();

            return new { Message = "User Registered!" };
        }

        public List<User> GetUsers()
        {
            var users = _dbContext.Users
            .ToList();

            return users;
        }

        public string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("vLyR7Jfom78Bq5x5");

            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("fullname", $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials,
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("vLyR7Jfom78Bq5x5");

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is invalid token");

            return principal;
        }

        public string CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = _dbContext.Users
                .Any(a => a.RefreshToken == refreshToken);


            if (tokenInUser)
            {
                return CreateRefreshToken();
            }

            return refreshToken;
        }

        public async Task<User> GetUserData(string email)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(a => a.Email == email);

            return user;
        }

        public async Task<object> SendEmail(string email)
        {
            var user = await GetUserData(email);

            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);
            string from = _config["EmailSettings:From"];
            var emailModel = new EmailModel(email, "Reset Password", EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailModel);
            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new
            {
                StatusCode = 200,
                Message = "Email has been sent!"
            };
        } 

        public async Task<User> ResetPasswordUser(ResetPasswordDto resetPasswordDto)
        {
            var user = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
            return user;
        }

        public void ResetPassword(User user, ResetPasswordDto resetPasswordDto)
        {
            user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
            _dbContext.Entry(user).State = EntityState.Modified;
        }
        
        public void SaveChangesAsync()
        {
            _dbContext.SaveChanges();
        }

        public User GetUserById(int id)
        {
            var user = _dbContext
                .Users
                .FirstOrDefault(a => a.Id == id);

            return user;
        }

        public bool ChangeRole(int id, string role)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
            user.Role = role;
            _dbContext.SaveChanges();

            return true;
        }

        public IQueryable<User> GetUsersByRole(Roles role)
        {
            var users = _dbContext.Users.Where(a => a.Role == role.GetDisplayName());

            return users;
        }

        public object isUserCheck(int id)
        {
            var user = GetUserById(id);

            if (user == null) {
                return new { Message = "This user does not exist" }; 
            }

            if (user.Role != Roles.USER.GetDisplayName())
            {
                switch (user.Role)
                {
                    case "ADMIN":
                        return new { Message = "This user has been admin" };
                    case "TEACHER":
                        return new { Message = "This user has been teacher" };
                    case "STUDENT":
                        return new { Message = "This user has been student" };
                    case "EDUCATOR":
                        return new { Message = "This user has been educator" };
                    case "TUTOR":
                        return new { Message = "This user has been tutor" };
                    default: break;
                }
            }

            return null;
        }
    }
}
