import { TestBed } from '@angular/core/testing';

import { LessonhoursService } from './lessonhours.service';

describe('LessonhoursService', () => {
  let service: LessonhoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonhoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
