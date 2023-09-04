using System.ComponentModel;

namespace LessonLogAPI.Models
{
    public enum Roles
    {
        [Description("USER")]
        USER,
        [Description("TEACHER")]
        TEACHER,
        [Description("ADMIN")]
        ADMIN,
        [Description("STUDENT")]
        STUDENT,
        [Description("TUTOR")]
        TUTOR,
        [Description("EDUCATOR")]
        EDUCATOR
    }
}
