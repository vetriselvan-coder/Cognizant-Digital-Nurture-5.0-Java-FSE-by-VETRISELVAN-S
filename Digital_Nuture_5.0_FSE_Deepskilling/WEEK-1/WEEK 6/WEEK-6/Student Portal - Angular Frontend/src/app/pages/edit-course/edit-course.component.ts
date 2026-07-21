import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {

  id!: number;

  name = '';
  code = '';
  credits: number | null = null;
  gradeStatus: Course['gradeStatus'] = 'pending';
  enrolled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(this.id).subscribe({

      next: (course) => {

        this.name = course.name;
        this.code = course.code;
        this.credits = course.credits;
        this.gradeStatus = course.gradeStatus;
        this.enrolled = course.enrolled;

      },

      error: (err) => console.error(err)

    });

  }

  onSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    const updatedCourse: Course = {

      id: this.id,
      name: this.name,
      code: this.code,
      credits: this.credits!,
      gradeStatus: this.gradeStatus,
      enrolled: this.enrolled

    };

    this.courseService.updateCourse(this.id, updatedCourse).subscribe({

      next: () => {

        alert('Course Updated Successfully');

        this.router.navigate(['/courses']);

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}