import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage['token'];

    if(token && request.url.includes('localhost')){
      const cloned = request.clone({
        headers: request.headers.set("Authorization","Bearer "+ token)
      });

      return next.handle(cloned)
    }
    else{
      return next.handle(request);
    }
    
  }
}
