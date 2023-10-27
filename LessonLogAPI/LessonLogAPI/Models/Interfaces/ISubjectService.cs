using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ISubjectService
    {
        Subject AddSubject(Subject subject);

        IQueryable<Subject> GetSubjects();

        Subject DeleteSubject(int id);

        Subject GetSubject(int id);

        void UpdateSubject(Subject newData);
    }
}
