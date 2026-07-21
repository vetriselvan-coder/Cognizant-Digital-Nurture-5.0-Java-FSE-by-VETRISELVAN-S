import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseCardComponent
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  courses$!: Observable<Course[]>;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {

    this.courses$ = this.store.select(selectAllCourses);

    this.store.dispatch(
      CourseActions.loadCourses()
    );

  }

}