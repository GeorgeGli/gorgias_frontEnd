import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

authFlag:boolean;

  loginflag:boolean=false;
  adminflag:boolean=false;
  navflag:boolean;
  _confiles=[];

  setLoginFlag(bool){
    this.loginflag=bool;
  }

  getLoginFlag(){
    return this.loginflag;
  }

  setAdminFlag(bool){
    this.adminflag=bool;
  }

  getAdminFlag(){
    return this.adminflag;
  }

  getnavflag(){
    this.navflag= this.adminflag || this.loginflag;
    console.log("navflag "+this.navflag);
    return this.navflag;
  }

  addConFile(name){
    if (!this._confiles.includes(name))
    this._confiles.push(name);
  }

  getConFileList(){
    return this._confiles;
  }

  rmConFileList(_path){

    for( let i = 0; i < this._confiles.length; i++)
        { 
          if ( this._confiles[i] == _path)
            {
              this._confiles.splice(i, 1); 
            }
        }
  }

  clearConFilesList(){
    this._confiles=[];
  }
}
