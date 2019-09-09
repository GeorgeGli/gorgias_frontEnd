import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { SharedService } from '../services/shared.service';
import { NgbPopover } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@ViewChild('popover') public popover: NgbPopover;
projects=[];
isCollapsed: boolean = true;

  constructor(private route: Router, private shared: SharedService, private service:AuthenticationService) { }

  ngOnInit() {
  }



   logout(){
     this.route.navigate(['/logout']);
   }


     closePopover(){
  this.popover.close();
}

getProjects(){
  this.service.getUserProjects()
              .subscribe(res=>{
                        console.table(res);
                        this.projects=res;}
                        );
}

getLoginFlag(){
//console.log("login flag apo navbar: "+this.shared.getLoginFlag());
//return this.shared.getnavflag();
return this.shared.getLoginFlag();
}

getAdminFlag(){
  return this.shared.getAdminFlag();
}
}
