import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'appusers',
  templateUrl: './appusers.component.html',
  styleUrls: ['./appusers.component.css']
})
export class AppusersComponent implements OnInit {

  users=[];
  modalRef: NgbModalRef;

  constructor(private service:AdminService,private modalService: NgbModal) { }

  ngOnInit() {
    
    this.service.getUsers().subscribe( (data)=>
                                           {console.table(data);
                                            this.users=data;
                                          },
                                         error=>console.log(error));
  }
  open(content) {
    this.modalRef =  this.modalService.open(content, {windowClass: 'modal-holder', centered: true});
     
    }

    closes(){
        
     this.modalRef.close();
 }

    dltuser(){
      console.log("delete user");
    }
  
    blockuser(){
      console.log("block user");
    }

}
