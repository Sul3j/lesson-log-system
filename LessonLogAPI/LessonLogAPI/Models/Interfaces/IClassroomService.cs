using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IClassroomService
    {
        Classroom AddClassroom(Classroom classroom);

        IQueryable<Classroom> GetAllClassrooms();

        Classroom DeleteClassroom(int id);

        Classroom GetClassroom(int id);
    }
}
