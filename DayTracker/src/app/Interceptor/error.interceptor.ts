import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private message: NzMessageService) { }
  ServerError(type: string): void {
    this.message.create(type, `A server error has occurred`);
  }
  ClientError(type: string): void {
    this.message.create(type, `a client side error has occurred`);
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.ClientError('error')
          } else {
            // server-side error
            this.ServerError('error')
          }
          if (error.status === 404) {
            this.router.navigateByUrl('result/404');
          }

          return throwError(errorMessage);
        })
      );
  }
}
