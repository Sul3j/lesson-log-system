﻿using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ITimetableLessonService
    {
        TimetableLesson AddLesson(TimetableLesson lesson);

        IQueryable<TimetableLesson> GetLessons();

        IQueryable<TimetableLesson> GetLessonsByClass(int classId);

        TimetableLesson DeleteLesson(int id);

        TimetableLesson GetLesson(int id);

        void UpdateLesson(TimetableLesson lesson);
    }
}
