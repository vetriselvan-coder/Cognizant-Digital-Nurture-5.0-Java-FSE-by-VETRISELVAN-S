import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {

  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all courses', () => {

    const mockCourses: Course[] = [
      {
        id: 1,
        name: 'Java',
        code: 'CS101',
        credits: 4,
        gradeStatus: 'passed',
        enrolled: true
      },
      {
        id: 2,
        name: 'Angular',
        code: 'CS102',
        credits: 3,
        gradeStatus: 'pending',
        enrolled: false
      }
    ];

    service.getCourses().subscribe(courses => {

      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);

    });

    const req = httpMock.expectOne(
      'http://localhost:5000/api/courses'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockCourses);

  });

  it('should handle server error', () => {

    service.getCourses().subscribe({

      next: () => fail('Expected an error'),

      error: (error) => {

        expect(error.status).toBe(500);

      }

    });

    const req = httpMock.expectOne(
      'http://localhost:5000/api/courses'
    );

    expect(req.request.method).toBe('GET');

    req.flush(
      'Server Error',
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );

  });

});