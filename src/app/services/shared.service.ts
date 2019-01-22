import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

authFlag:boolean;

  loginflag:boolean=false;

  setLoginFlag(bool){
    this.loginflag=bool;
  }

  getLoginFlag(){
    return this.loginflag;
  }
}
