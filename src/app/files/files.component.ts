import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { OperationsService } from '../services/operations.service';
import { Location } from '@angular/common';
import { NgbModal, NgbModalRef } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
 
})
export class FilesComponent implements OnInit, OnDestroy  {

  project: string;
  private sub: any;
  files:string[];
  modalRef: NgbModalRef;

  constructor(private route: ActivatedRoute, private service: OperationsService, private location: Location, private modalService: NgbModal) {
    this.sub = this.route.params.subscribe(params => {
       this.project = params['project'];
       this.service.getProjectFiles(this.project).subscribe(fList => {this.files=fList; }, error => { console.log(error.status); });
    });
  }

    ngOnInit() {

    }

    back(){
      this.location.back();
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    open(content) {
      this.modalRef =  this.modalService.open(content, {windowClass: 'modal-holder', centered: true});
       
      }

      closes(){
        
          this.service.getProjectFiles(this.project).subscribe(fList => {console.log("success");this.files=fList; }, error => { console.log("error alla mpika!"+error.status); });
         this.modalRef.close({windowClass: 'modal-holder', centered: true});
     }
}
