import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private modalService: NgbModal, private shared: SharedService) { }

  ngOnInit() {
  }
  @ViewChild('myModal')
  modal: ElementRef;
  modalRef: NgbModalRef;


  open() {
    this.modalRef = this.modalService.open(this.modal);
}

getLoginFlag(){
return this.shared.getLoginFlag();

}

closes(){
      this.modalRef.close();
  }
}
