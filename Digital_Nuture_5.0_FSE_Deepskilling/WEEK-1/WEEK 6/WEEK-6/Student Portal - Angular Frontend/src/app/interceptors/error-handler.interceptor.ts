import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    catchError(error => {

      if (error.status === 401) {
        alert('Unauthorized!');
      }

      if (error.status === 500) {
        alert('Internal Server Error!');
      }

      return throwError(() => error);

    })

  );

};