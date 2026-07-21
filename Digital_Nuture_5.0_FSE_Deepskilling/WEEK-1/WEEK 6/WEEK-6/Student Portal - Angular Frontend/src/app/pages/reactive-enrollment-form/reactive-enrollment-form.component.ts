import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  FormArray,
  FormControl
} from '@angular/forms';

/* Custom Validator */
function noCourseCode(control: AbstractControl): ValidationErrors | null {

  const value = control.value;

  if (value && value.toString().startsWith('XX')) {
    return { noCourseCode: true };
  }

  return null;

}

/* Async Validator */
const simulateEmailCheck: AsyncValidatorFn = (
  control: AbstractControl
): Promise<ValidationErrors | null> => {

  return new Promise(resolve => {

    setTimeout(() => {

      const email = control.value;

      if (email && email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }

    }, 800);

  });

};

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      studentEmail: this.fb.control(
        '',
        {
          validators: [
            Validators.required,
            Validators.email
          ],
          asyncValidators: [
            simulateEmailCheck
          ],
          updateOn: 'blur'
        }
      ),

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array<FormControl>([])

    });

  }

  // Typed getter for FormArray
  get additionalCourses(): FormArray<FormControl> {
  return this.enrollForm.get('additionalCourses') as FormArray<FormControl>;
}

  addCourse() {

    this.additionalCourses.push(

      new FormControl('', Validators.required)

    );

  }

  removeCourse(index: number) {

    this.additionalCourses.removeAt(index);

  }

  // enrollForm.value returns only enabled controls.
  // enrollForm.getRawValue() returns all controls,
  // including disabled controls.

  onSubmit() {

    console.log(this.enrollForm.value);

    console.log(this.enrollForm.getRawValue());

  }

}