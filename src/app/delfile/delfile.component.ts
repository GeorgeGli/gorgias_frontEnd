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

  @Input('filename') 
  filename:string;

  @Input('project') 
  project:string;

  @Output()
  closeModal = new EventEmitter<any>();

  constructor(private service:OperationsService, private router:Router,private location: Location) { }

  ngOnInit() {
  }
  
  deletefile(){
   // console.log("file to delete: "+this.filename)
    //console.log("project to delete: "+this.project)
    this.service.dltFile(this.filename, this.project)
                .subscribe((res)=> {
                    if (res="OK"){
                      console.log("all good!");
                      this.closeModal.next();
                      this.location.back();
                    }else{console.log("error!")}
                  })
  }
}
