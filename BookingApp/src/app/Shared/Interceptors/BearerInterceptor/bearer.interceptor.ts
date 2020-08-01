import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  count : number = 0
  constructor(private toasterService : ToastrService,private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage['token'];
    if(this.count == 0)
      this.spinner.show();
    this.count++;
    if(token && request.url.includes('localhost')){
      const cloned = request.clone({
        headers: request.headers.set("Authorization","Bearer "+ token)
      });

      return next.handle(cloned).pipe(catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
            try {
                this.toasterService.error(err.error.message, "Error", { positionClass: 'toast-center-center',closeButton:true  });
            } catch(e) {
                this.toasterService.error('An error occurred', '', { positionClass: 'toast-center-center',closeButton:true  });
            }
        }
        return of(err);
    }),finalize(() =>{
      this.count--;
      if(this.count == 0)
        this.spinner.hide()
    }));
    }
    else{
      return next.handle(request).pipe(catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
            try {
                this.toasterService.error(err.error.message, "Error", { positionClass: 'toast-center-center',closeButton:true  });
            } catch(e) {
                this.toasterService.error('An error occurred', '', { positionClass: 'toast-center-center',closeButton:true });
            }
        }
        return of(err);
    }),finalize(() =>{
      this.count--;
      if(this.count == 0)
        this.spinner.hide()
    }));
    }
    
  }
}
