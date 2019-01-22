import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'delproj',
  templateUrl: './delproj.component.html',
  styleUrls: ['./delproj.component.css']
})
export class DelprojComponent implements OnInit {
@Input() projectname:string;
@Output()
closeModal = new EventEmitter<any>();

  constructor(private service:OperationsService, private router:Router) { }

  ngOnInit() {
  }
deleteProject(){
  console.log("proj to delete: "+this.projectname)

  this.service.dltProj(this.projectname)
              .subscribe(res=>{
                            this.closeModal.next();
                          if (res='OK'){

                                   this.router.navigate(['/projects']);
                                 }
                          },
                         error=>{this.closeModal.next();
                               console.log("error: "+error)
                             })
}
}
