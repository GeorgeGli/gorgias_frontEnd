import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { OperationsService } from '../services/operations.service';

@Component({
  selector: 'addfile',
  templateUrl: './addfile.component.html',
  styleUrls: ['./addfile.component.css']
})
export class AddfileComponent implements OnDestroy {

 @Input() projectname:string;
 @Output()
 closeModal = new EventEmitter<any>();
  file: File = null;
 dup:boolean=true;

  constructor(private service:OperationsService) {}

  onFileSelected(event){

    this.file =<File> event.target.files[0];

  }

  onFileUpload(){

  this.service.uploadFile(this.file,this.projectname)
              .subscribe((res)=>{
                      if (res="OK"){
                        console.log(res);
                        this.closeModal.next();
                      }
                   },
                 error=>{
                   this.dup=false;
                 });

  }

  ngOnDestroy(){
    this.dup=true;
  }
}
