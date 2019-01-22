import { Component, Input, EventEmitter, Output } from '@angular/core';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'addfile',
  templateUrl: './addfile.component.html',
  styleUrls: ['./addfile.component.css']
})
export class AddfileComponent  {

 @Input() projectname:string;
 @Output()
 closeModal = new EventEmitter<any>();
  file: File = null;


  constructor(private service:OperationsService) {}

  onFileSelected(event){

    this.file =<File> event.target.files[0];

  }

  onFileUpload(){

  this.service.uploadFile(this.file,this.projectname);
    this.closeModal.next();
  }
}
