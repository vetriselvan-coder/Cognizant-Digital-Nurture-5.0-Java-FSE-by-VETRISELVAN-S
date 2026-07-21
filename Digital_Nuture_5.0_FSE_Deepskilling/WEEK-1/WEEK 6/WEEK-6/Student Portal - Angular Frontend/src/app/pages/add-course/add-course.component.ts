import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  name: string = '';
  code: string = '';
  credits: number | null = null;

  // IMPORTANT FIX
  gradeStatus: 'passed' | 'failed' | 'pending' = 'pending';

  enrolled: boolean = false;

  successMessage = '';

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    const course: Omit<Course, 'id'> = {
      name: this.name,
      code: this.code,
      credits: this.credits!,
      gradeStatus: this.gradeStatus,
      enrolled: this.enrolled
    };

    this.courseService.createCourse(course).subscribe({

      next: () => {

        this.successMessage = 'Course Added Successfully!';

        form.resetForm({
          gradeStatus: 'pending',
          enrolled: false
        });

        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 1000);

      },

      error: (err) => {
        console.error(err);
        alert('Failed to add course.');
      }

    });

  }

}