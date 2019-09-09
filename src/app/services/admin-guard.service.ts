import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '../../../node_modules/@angular/router';
import { SharedService } from './shared.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private router: Router, private shared: SharedService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{


        if (localStorage.getItem('ID') && (localStorage.getItem('ID').charAt(localStorage.getItem('ID').length-1))=='a'){
          
            this.shared.setLoginFlag(true);
            this.shared.setAdminFlag(true);
            
            return true;
          }
          
          this.shared.setAdminFlag(false);
          this.shared.setLoginFlag(false);
          this.router.navigate(['/']);
          
          return false;
  }
}
