using Microsoft.OpenApi.Extensions;
using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public string ResetPasswordToken { get; set; }
        public DateTime ResetPasswordExpiry { get; set; }
        public string Role { get; set; } = Roles.USER.GetDisplayName();
        public string ChatConnectionKey { get; set; }
        public Teacher Teacher { get; set; }
        public Student Student { get; set; }
        public Tutor Tutor { get; set; }
        public Admin Admin { get; set; }
    }
}
