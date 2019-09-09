import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '../../../node_modules/@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { SharedService } from './shared.service';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private auth: AuthenticationService, private router: Router, private shared: SharedService) { }


intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request)
                 .pipe(catchError(err => 
                                 {

                                    if (err.status === 401) {
                                                
                                        this.router.navigate(['/logout']);
                                    }

                                    if (err.status === 403){
                                      
                                      this.router.navigate(['/logout']);
                                    }

                                    if (err.status === 0){
                                      this.router.navigate(['/']);
                                      
                                    }

                                    if (err.status === 400){
                                      //bad request
                                      console.log("tinaftore 400?");
                                    }

                                    const error = err.error.message || err.statusText;
                                    return throwError(error);

                                }))
  }
  
}
