﻿using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ILessonService
    {
        Lesson AddLesson(Lesson lesson);

        IQueryable<Lesson> GetLessons();

        Lesson DeleteLesson(int id);

        Lesson GetLesson(int id);

        void UpdateLesson(Lesson lesson);

        IQueryable<Lesson> GetLessonsWithParametrs(int teacherId, int classId, int subjectId);

        IQueryable<Lesson> GetLessonsByClassId(int classId);
    }
}
