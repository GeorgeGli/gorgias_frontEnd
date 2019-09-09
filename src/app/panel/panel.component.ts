import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { Query } from '../models/query';
import { OperationsService } from '../services/operations.service';
import { map } from 'rxjs/operators';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit{


 constructor(private service: OperationsService, private shared: SharedService){}

 @ViewChild('editor') editor;
_opened:boolean = false;
_query:any;  
_results:string = "";
_resNum:number = 10;
_mode:string[] = ['push','over'];
innerWidth:any;
myTextarea:string;
queDisplay:string;
mode_number:number;
query: Query={ query:'',
               result_size:2,
               time:5
              };
 
 
ngOnInit(){

  this.innerWidth = window.innerWidth;
  
  if (this.innerWidth>1640)
     this.mode_number=1;
  else if(this.innerWidth<1640 && this.innerWidth>500)
     this.mode_number=0;
  else
     console.log('screen is too small!');

  this.editor.mode = 'prolog';
  this.editor.setReadOnly(true);
  this.editor.theme = 'pastel_on_dark';
  this.editor.getEditor().setOptions({
    showGutter: true,
    showLineNumbers: true,
    fontSize: '1rem',
    tabSize: 2
  });
}
            
@HostListener('window:resize', ['$event'])
onResize(event) {

  this.innerWidth = window.innerWidth;
  
  if (this.innerWidth>1640)
     this.mode_number=1;
  else if (this.innerWidth<1640 && this.innerWidth>500)
     this.mode_number=0;
  else
     console.log('screen is too small!')
  
}

_toggleSidebar(){
      this._opened = !this._opened;
   }



setQuery(textq,_resSize){

        
        this.myTextarea=null;
      
        var lastChar = textq[textq.length -1];

        if ((lastChar)=='\n'){
          console.log("lastchar: "+lastChar);
        }

        
        var splitted = textq.split("(",2);
        
        this.query.query = textq;
        this.query.result_size = this._resNum;
        this.query.time = 5;


        if (splitted[0]=='consult' || splitted[0]=='load_files'){ 

          let _split = splitted[1].split("/",2),
              _project = _split[0].replace(/[']/g, ""),
              _filename = _split[1].split("'",1);

                return this.service.consultViaProj(_project, _filename)
                                   .subscribe( (res) => {                                     
                                                  if (res.toString()=='true'){
                                                      this.addToConList(_project,_filename);
                                                    }
                                                      this.queDisplay=textq,
                                                      this.editor.value = this.editor.value+"\n "+_filename+" consulting : "+res;
                                                   },
                                               (error) => console.log(error))                     
        }
        else if (splitted[0]=='prove'){

                return this.service.proveQuery(this.query)
                                   .pipe(
                                            map((res) => {
                                                for (let i = 0; i<res.length; i++){
                                    
                                                  let j = i+1,
                                                      r = this.decoder(res[i].toString())
                                                  this.editor.value = this.editor.value+"\n"+j+": "+r+"\n\n"                                           
                                                }                                             
                                                return this.editor.value;
                                            }))
                                   .subscribe(() => this.queDisplay=textq,
                                              (error) => console.log("error: "+error))                         
        } 
        else if (splitted[0]=='assert' || splitted[0]=='assertz'){

          this._query = this.service.assertQuery(this.query.query)                       
          } 
        else if (splitted[0]=='asserta'){

            this._query = this.service.assertaQuery(this.query.query)                       
            } 
        else if (splitted[0]=='abolish'){

              this._query = this.service.abolishQuery(this.query.query)                        
            }
        else if (splitted[0]=='unload'){

                return this.service.unloadQuery(this.query.query)
                                   .subscribe((res) => {
                                                this.queDisplay=textq;
                                                this.editor.value = this.editor.value+"\n unload "+this.query.query+" : "+res
                                                },
                                              (error) => console.log("error: "+error))                       
              }
        else if (splitted[0]=='retract'){

                this._query = this.service.retractQuery(this.query.query)                         
                }       
        else {
          this._query = this.service.prologQuery(this.query);
           }

      return this._query.subscribe((res) => {
                                this.queDisplay=textq,
                                this.editor.value = this.editor.value+"\n "+res;
                                },
                              (error) => console.log("error: "+error))
  }


decoder(_prove){
       
        let a = _prove.replace( /[{}''|]/g, ""),
            b = a.replace(/[\[\]']+/g, ""),
            c = b.replace(")))))", ""),
            d = c.replace("Delta", "\n   Delta"),
            e = d.replace("=", " = "),
            f = e.replace(/,(?=[^,]*$)/, "]"),
            g = f.replace("(", "[");

        for (let i = 0; i < g.length; i++)
        {
            if ((g.charAt(i-1)==" ") && (g.charAt(i-2)==",") && (g.charAt(i)=="(")){
              let r = g.charAt(i);
              //console.log(r);
              var _final = g.replace(r, " ")
            }
        }

    return _final;
  }


unload_file(_path){
      
    let f = _path.split("/",2);  

    this.service.unloadQueryViaProj(f[0], f[1])
                .subscribe((res)=>
                                {
                                  this.queDisplay='unload -> '+f[1],
                                  this.editor.value = this.editor.value+"\nunload "+_path+" : "+res;

                                  if (res == 'true')
                                      this.shared.rmConFileList(_path);
                                    
                                });
  }

addToConList(project, filename){

    let _newfile = project+"/"+filename; 

    this.shared.addConFile(_newfile);
  
  }
  
  getConList(){
   return this.shared.getConFileList();
  }
}
