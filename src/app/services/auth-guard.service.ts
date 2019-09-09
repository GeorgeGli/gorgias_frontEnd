import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '../../../node_modules/@angular/router';
import { SharedService } from './shared.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private shared: SharedService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

       
        if ( localStorage.getItem('ID')){
            this.shared.setLoginFlag(true);
            console.log("loginflag: "+this.shared.getLoginFlag());
            return true;
          }
          console.log("loginflag out: "+this.shared.getLoginFlag());
          this.shared.setLoginFlag(false);
          this.router.navigate(['/']);
          return false;
  }
}
