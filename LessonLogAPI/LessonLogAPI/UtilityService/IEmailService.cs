using LessonLogAPI.Models;

namespace LessonLogAPI.UtilityService
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
