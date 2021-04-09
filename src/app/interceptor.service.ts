import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404 || error.status === 500) {
            return next.handle(req).pipe(
              retryControllForAuthErrors(),
              catchError((error: HttpErrorResponse) => {
                let errorMessage = `Interceptor Error: ${error.status} ${error.message}`;
                console.warn(errorMessage);
                return throwError(error);
              })
            );
          } else {
            return throwError(error.message);
          }
        }
      })
    );
  }
}
/**
 * we increase the delay after each retry.
 * The first retry happens after one second, the second one after two seconds
 * and the third one after three seconds.
 */
const retryControllForAuthErrors = () => {
  let retries = 1;
  return (data: Observable<any>) =>
    data.pipe(
      retryWhen((errors: Observable<any>) =>
        errors.pipe(
          mergeMap((error) => {
            if (retries-- > 0) {
              console.log('Throw Retries');
              /**
               * 1500 = delay in ms
               * 2 = maxRetrys intents
               * last 1500 = backOfficeMs
               */
              const backoffTime = 1000 + (1 - retries) * 1000;
              return of(error).pipe(delay(backoffTime));
            }
            return throwError(error);
          })
        )
      )
    );
};
