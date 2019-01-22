import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { Router } from '../../../node_modules/@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'delfile',
  templateUrl: './delfile.component.html',
  styleUrls: ['./delfile.component.css']
})
export class DelfileComponent implements OnInit {
  @Input() filename:string;
  @Output()
  closeModal = new EventEmitter<any>();
  constructor(private service:OperationsService, private router:Router,private location: Location) { }

  ngOnInit() {
  }
  deletefile(){
    console.log("file to delete: "+this.filename)

    this.service.dltFile(this.filename).subscribe(res=> {this.closeModal.next();
    this.location.back();})
  }
}
