import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {

  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        CourseCardComponent,
        HttpClientTestingModule
      ],

      providers: [
        provideRouter([])
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);

    component = fixture.componentInstance;

    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
      enrolled: false
    };

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should render course name', () => {

    const title = fixture.debugElement.query(By.css('h2')).nativeElement;

    expect(title.textContent).toContain('Data Structures');

  });

  it('should toggle details', () => {

    expect(component.isExpanded).toBeFalse();

    component.toggleDetails();

    expect(component.isExpanded).toBeTrue();

  });

  it('should return green border for passed course', () => {

    expect(component.borderColor).toBe('green');

  });

  it('should compute card classes', () => {

    expect(component.cardClasses['card--full']).toBeTrue();

  });

});