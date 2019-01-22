import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private service: AuthenticationService, private route: Router, private shared:SharedService) {
            this.service.logout()
                        .subscribe(res=>{
                          this.shared.setLoginFlag(false);
                          this.route.navigate(['/']);
                        });
      }

}
