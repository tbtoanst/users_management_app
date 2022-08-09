import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LoadingSpinnerService } from '../services/common';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private spinnerService: LoadingSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add token to header
    this.spinnerService.addQuene();
    const clonedRequest = this.cookieService.check('authToken')
      ? req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + this.cookieService.get('authToken')
          ),
        })
      : req;
    // delay to showing spinner
    return next.handle(clonedRequest).pipe(delay(500),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.removeQuene();
        }
        return evt;
      })
    );
  }
}
