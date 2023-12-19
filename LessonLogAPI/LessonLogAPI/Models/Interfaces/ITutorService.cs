using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ITutorService
    {
        IQueryable<Tutor> GetTutors();

        Tutor AddTutor(Tutor tutor);

        Tutor DeleteTutor(int id);

        Tutor GetTutor(int id);

        Tutor GetTutorByEmail(string email);
    }
}
