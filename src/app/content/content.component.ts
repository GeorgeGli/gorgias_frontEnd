import { Component, OnInit, OnDestroy, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { OperationsService } from '../services/operations.service';
import { Location } from '@angular/common';
import { NgbModalRef, NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {




  @ViewChild('editor') editor;
  
  _updatedFile:File = null;
  filename: string;
  project: string;
  private sub: any;
  content: string;
  modalRef: NgbModalRef;
  _consulted: boolean;
  _save: boolean = true;
  _cfile: string;
  _compile1:string = ":-compile('/home/gorgias-src-0.6d/lib/gorgias.pl').";
  _compile2:string = ":-compile('/home/gorgias-src-0.6d/ext/lpwnf.pl').";
  _include:string = ":-include('/home/georgegl/Documents/gorgias_directory";

  constructor(private route: ActivatedRoute, private service: OperationsService, private location: Location, private modalService: NgbModal, private router: Router, private shared: SharedService) {}

  ngOnInit() {


     this.editor.mode = 'prolog';
     this.editor.setReadOnly(true);
     this.editor.theme = 'pastel_on_dark';
     this.editor.getEditor().setOptions({
      showGutter: false,
      showLineNumbers: false,
      fontSize: '1rem',
      tabSize: 2
    });
   
      this.sub = this.route.params.subscribe((params) => {

                                     this.filename = params['filename'];
                                     this.project = params['project'];

                                     this.service.getFileContent(this.filename, this.project)
                                                 .subscribe((confile) => {
                                        
                                                                if(confile.includes(this._compile1)){
                                                                 
                                                                  let _display = confile.replace(this._compile1, ":-compile('../lib/gorgias.pl')."),
                                                                      _display2 = _display.replace(this._compile2, ":-compile('../ext/lpwnf.pl').");
                                                                  confile=_display2;
                                                                }

                                                                if(confile.includes(this._include)) {
                                                                  
                                                                  let _display = confile.replace(this._include, ":-include('..");
                                                                  confile=_display;
                                                                }
                                                              
                                                                this.editor.value= confile.toString();                                      
                                                               },
                                                            (error) => console.log(error.status));
                                  });                                          
                                 
      if (this.shared.getConFileList().includes(this.project+"/"+this.filename))
          this._consulted=true;
                                  
    }

  back(){
      this.location.back();
    }

  consultfile(){
      
        this._cfile = "consult('"+this.filename+"').";
      
        return this.service.consultQuery(this._cfile)
                           .subscribe(res=>{
                                      if (res='true'){
                                        this.shared.addConFile(this.project+"/"+this.filename);
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
      this.modalRef =  this.modalService.open(content, {windowClass: 'modal-holder', centered: true});

      }

  closes(){

         this.modalRef.close();
     }


  downloadFile(){
       var filetext = this.content;
       var fileName = this.filename;
       let blob = new Blob([filetext], {type: 'text/plain'})
       
       FileSaver.saveAs(blob, fileName);
     }


  editMode(){
      
      this.editor.getEditor().setOptions({
        showGutter: true,
        showLineNumbers: true
      });
     
      this.editor.setReadOnly(false);
      this._save = false;  
     }

  savefile(){

    let blob = new Blob([this.editor.value], {type: 'text/plain'}),
        arrayOfBlob = new Array<Blob>();
        arrayOfBlob.push(blob);

    this._updatedFile = new File(arrayOfBlob, this.filename, { type: 'text/plain' });
    
    this.service.updateFile(this._updatedFile, this.project)
                .subscribe((response)=>{
                                if (response=='OK'){
                                  alert('file updated!')
                                     if (this._consulted){
                                       this.unloadConsultedFile(this.filename, this.project);    
                                     }
                                }                                 
                                else
                                    {
                                      alert('something wrong happened!')
                                    }
                            },
                          (error)=>console.log(error))

      this.editor.getEditor()
                 .setOptions({
                      showGutter: false,
                      showLineNumbers: false
                    });
      
      this.editor.setReadOnly(true);
      this._save = true;
  }


  unloadConsultedFile(filename, project){

    let _path = project+"/"+filename;

    this.service.unloadQueryViaProj(project, filename)
                .subscribe((res)=>{ 
                              if (res == 'true')
                                  {
                                    this.shared.rmConFileList(_path);
                                    this._consulted = false;
                                  }
                            })
  }

  ngOnDestroy() {
      this.sub.unsubscribe();   
    }

    

}
