using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IGradeService
    {
        Grade AddGrade(Grade grade);

        IQueryable<Grade> GetGrades();

        Grade DeleteGrade(int id);

        Grade GetGrade(int id);

        void UpdateGrade(Grade grade);

        IQueryable<Grade> GetGradeByStudentId(int studentId);
    }
}
