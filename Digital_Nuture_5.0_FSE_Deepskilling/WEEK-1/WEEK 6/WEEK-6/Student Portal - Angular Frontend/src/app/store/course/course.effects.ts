import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CourseService } from '../../services/course.service';

import * as CourseActions from './course.actions';

import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CourseEffects {

  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(

      ofType(CourseActions.loadCourses),

      switchMap(() =>
        this.courseService.getCourses().pipe(

          map(courses =>
            CourseActions.loadCoursesSuccess({ courses })
          ),

          catchError(error =>
            of(
              CourseActions.loadCoursesFailure({
                error: error.message
              })
            )
          )

        )
      )

    )
  );

}