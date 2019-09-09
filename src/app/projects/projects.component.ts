import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NgbModal, NgbModalRef } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
projects=[];
modalRef: NgbModalRef;

  constructor(private service: AuthenticationService, private modalService: NgbModal) {
          this.service.getUserProjects().subscribe(res=>{this.projects=res;});
   }

  ngOnInit() {
    console.log("mpika gia check!")
  }

  open(content) {
    this.modalRef =  this.modalService.open(content, {windowClass: 'modal-holder'});
    }

    closes(){
       this.service.getUserProjects().subscribe(res=>{this.projects=res;});
       this.modalRef.close();
    }


}
