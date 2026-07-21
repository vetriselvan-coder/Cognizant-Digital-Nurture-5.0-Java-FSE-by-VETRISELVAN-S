import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CourseSummaryWidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';
  availableCourses = 0;
  isPortalActive = true;

  message = '';
  searchTerm = '';

  constructor(private courseService: CourseService) {}

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnInit(): void {
   this.courseService.getCourses().subscribe({
  next: (courses) => {
    this.availableCourses = courses.length;
  }
});

    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

}