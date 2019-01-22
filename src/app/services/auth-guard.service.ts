import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '../../../node_modules/@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private shared: SharedService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

          if (sessionStorage.getItem('sesID')){
            this.shared.setLoginFlag(true);
            return true;
          }
          this.shared.setLoginFlag(false);
          this.router.navigate(['/']);
          return false;
  }
}
