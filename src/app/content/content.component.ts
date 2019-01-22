import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { OperationsService } from '../services/operations.service';
import { Location } from '@angular/common';
import { NgbModalRef, NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Query } from 'src/app/models/query';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  filename: string;
  private sub: any;
  content: string;
    modalRef: NgbModalRef;
    query: Query={ query:'',
                   result_size:2,
                   time:5
                  };
  constructor(private route: ActivatedRoute, private service: OperationsService, private location: Location, private modalService: NgbModal, private router: Router) {}

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
                                     this.filename = params['filename'];

                                     this.service.getFileContent(this.filename)
                                                 .subscribe(confile => {

                                                                  this.content=confile.toString();
                                                                      },
                                                              error => {
                                                                  console.log(error.status);
                                                              });
                                  });
    }

    back(){
      this.location.back();
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    consultfile(){
        this.query.query = "consult('"+this.filename+"').";
        this.query.result_size = 2;
        this.query.time = 5;

        return this.service.prologQuery(this.query)
                           .subscribe(res=>{
                                      if (res='true'){
                                        this.router.navigate(['/panel']);
                                      }else{
                                        console.log("something happened! "+res)
                                      }
                                      console.log("prolog response: "+res)
                                      },
                                      error=>{
                                        console.log("error: "+error)
                                      })
    }

    open(content) {
      this.modalRef =  this.modalService.open(content);

      }

      closes(){

         this.modalRef.close();
     }
}
