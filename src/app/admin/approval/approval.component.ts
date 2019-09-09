import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  ap_users=[];
  modalRef: NgbModalRef;


  constructor(private service:AdminService,private modalService: NgbModal) { }

  ngOnInit() {
    this.service.getUsersForApproval()
                .subscribe( (data)=>
                              {console.table(data);
                                
                                    this.ap_users=data;
                                  },
                                  (error)=>{console.log(error)});
  }


  enableUser(){
    console.log("enable user re!");
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
}
