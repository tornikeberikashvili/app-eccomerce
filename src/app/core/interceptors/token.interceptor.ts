import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {AuthFacades} from "../../facades";
import {inject} from "@angular/core";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacades)
  return next(req)
    .pipe(
      catchError((err: any) => {
        if (err.status === 400) {
          // handle 401 error
          console.log('400 error')
          if(err.error.error.message === 'INVALID_ID_TOKEN'){
            //do something
            authFacade.logout()
             return throwError(() => err)

          }

        }
        return throwError(() => err)
      })
    )
};
