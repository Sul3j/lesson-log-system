using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using System.Security.Claims;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(User userObj);

        Task<TokenDto> Authenticate(User userObj);

        Task<bool> CheckEmailExistAsync(string email);

        string CheckPasswordStrength(string password);

        Task<object> RegisterUser(User userObj);

        List<User> GetUsers();

        string CreateJwt(User user);

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

        string CreateRefreshToken();

        Task<object> SendEmail(string email);

        Task<User> GetUserData(string email);

        Task<User> ResetPasswordUser(ResetPasswordDto resetPasswordDto);

        void ResetPassword(User user, ResetPasswordDto resetPasswordDto);

        void SaveChanges();

        User GetUserById(int id);

        Task<bool> ChangeRole(int id, int roleId);
    }
}
