﻿using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface ITutorService
    {
        List<Tutor> GetTutors();

        Tutor AddTutor(Tutor tutor);
    }
}
