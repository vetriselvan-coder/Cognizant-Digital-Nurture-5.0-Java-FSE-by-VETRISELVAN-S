import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {

  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed' as const,
    enrolled: false
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should render course name', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;

    expect(title.textContent).toContain('Data Structures');

  });

  it('should emit enrollRequested event', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    component.toggleEnrollment();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);

  });

  it('should call ngOnChanges', () => {

    spyOn(console, 'log');

    component.course = mockCourse;

    component.ngOnChanges({

      course: new SimpleChange(
        null,
        mockCourse,
        true
      )

    });

    expect(console.log).toHaveBeenCalled();

  });

});