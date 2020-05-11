import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { default as mockEndpoints } from './mock.config';

let currentMockEndpoint;

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `https://jsonplaceholder.typicode.com/${request.url}` });
    currentMockEndpoint = mockEndpoints[apiReq.method] && mockEndpoints[apiReq.method][apiReq.url] || null;
    // checks if current request comes from mock api or not
    return currentMockEndpoint ? currentMockEndpoint.handler() : next.handle(apiReq);
  }
}
