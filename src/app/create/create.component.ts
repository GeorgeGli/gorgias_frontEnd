import { Component, OnInit, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

success:boolean=true;
fail:boolean=true;
@Output()
closeModal = new EventEmitter<any>();

  constructor(private service: OperationsService, private route: Router) { }

  onSubmit(project){

    this.service.createNewProject(project.pname)
                .subscribe((res)=>
                             {if (res="OK"){
                               console.log(res);
                               this.success=false;
                               this.fail=true;
                               this.route.navigate(['/projects']);
                             }else{
                               this.success=true;
                               this.fail=false;
                             }
                             this.closeModal.next();
                                },
                            (error)=>
                            { console.log("error: "+error);
                              this.fail=false;
                              this.success=true;

                            });

     }


}
