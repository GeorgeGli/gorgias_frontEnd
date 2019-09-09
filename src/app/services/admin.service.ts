import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { User_for_approval } from '../models/user_for_approval';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private httpClient:HttpClient) { }

  getUsers(){
    
        let url = '/api/admin/users';
    return this.httpClient.get<User[]>(url);
  }

  getUsersForApproval(){
    let url = '/api/admin/enable';

    return this.httpClient.get<User_for_approval[]>(url);
  }

  getUsersStats(){

    let url = '/api/admin/userstats';
    return this.httpClient.get(url);
  }

   getdbStats(){
    let url = '/api/admin/dbstats';
    return this.httpClient.get(url);
   }
}
