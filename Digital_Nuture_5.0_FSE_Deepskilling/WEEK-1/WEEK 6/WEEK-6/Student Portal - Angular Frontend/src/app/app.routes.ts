import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'courses', component: CourseListComponent },

  { path: 'courses/:id', component: CourseDetailComponent },

{
  path: 'profile',
  canActivate: [authGuard],
  component: StudentProfileComponent
},
{
  path: 'enroll',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/enrollment-form/enrollment-form.component')
      .then(c => c.EnrollmentFormComponent)
},
{
  path: 'enroll-reactive',
  loadComponent: () =>
    import('./pages/reactive-enrollment-form/reactive-enrollment-form.component')
      .then(c => c.ReactiveEnrollmentFormComponent)
},
{
  path: 'add-course',
  component: AddCourseComponent
},
{ path: 'edit-course/:id', component: EditCourseComponent },

  { path: '**', component: NotFoundComponent }

];