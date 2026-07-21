import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { EnrollmentApiService } from '../../services/enrollment-api.service';
import { Enrollment } from '../../models/enrollment';


@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css'
})
export class EnrollmentFormComponent {

  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = '';
  agreeToTerms = false;

  submitted = false;

  constructor(private enrollmentApiService: EnrollmentApiService) {}

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const enrollment: Enrollment = {

      studentName: this.studentName,

      email: this.studentEmail,

      courseId: this.courseId!,

      semester: this.preferredSemester,

      acceptedTerms: this.agreeToTerms

    };

    this.enrollmentApiService.createEnrollment(enrollment).subscribe({

      next: (response) => {

        console.log('Enrollment Successful');

        console.log(response);

        this.submitted = true;

        form.resetForm();

      },

      error: (err) => {

        console.error(err);

        alert('Enrollment Failed');

      }

    });

  }

}