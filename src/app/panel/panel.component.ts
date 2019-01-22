import { Component } from '@angular/core';
import { Query } from '../models/query';
import { OperationsService } from '../services/operations.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {



 constructor(private service: OperationsService ){}

myTextarea:string;
queDisplay:string;
results:string='';
size:number=2;
query: Query={ query:'',
               result_size:2,
               time:5
              };

  setQuery(textq){

        console.log("string: "+textq);
        console.log("lentgh: "+textq.length);
        this.myTextarea=null;

        var lastChar = textq[textq.length -1];

        if ((lastChar)=='\n'){
          console.log("lastchar: "+lastChar);
        }


      /*  if (this.results=='' ){

          this.results=this.results+textq;

        }
        else if (this.results=='' && (lastChar)=='\n'){

           let str = textq;
           str = textq.substring(0,str.length-1);
           this.results=this.results+str;

        }else if((lastChar)=='\n'){

           let str = textq;
           str = textq.substring(0,str.length-1);
           this.results=this.results+'\n'+str;

        }
        else{
          this.results=this.results+'\n'+textq;
        }*/

        console.log("query: "+textq);
        this.query.query = textq;
        this.query.result_size = this.size;
        this.query.time = 5;

        return this.service.prologQuery(this.query)
                           .subscribe(res=>{
                                      this.queDisplay=textq,
                                      this.results=res,
                                      console.log("prolog response: "+res)
                                      },
                                      error=>{
                                        console.log("error: "+error)
                                      })
  }



  setSize(size){
    this.size=size;
    console.log("size: "+this.size);
   }

}
