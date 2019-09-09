import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }



  authenticate(credentials){

        let headers = new HttpHeaders(credentials ? {
                    authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password),
                    'X-Requested-With' : 'XMLHttpRequest'
                } : {}
              );

        let url = '/api/user';
      //return this.httpClient.get(url, {headers, responseType: 'text'});
      return this.httpClient.get(url, {headers});
  }


  getUserProjects(){
        let url = '/api/userProjects';
    return this.httpClient.get<string[]>(url);
  }



  logout(){
        let url = '/api/logout';
        //sessionStorage.removeItem('sesID');
    return this.httpClient.get(url,{ responseType: 'text'});
  }



  getUsernameCheck(username){

    const fd=new FormData();
    fd.append('username',username);
    let url = '/api/usernamecheck';

    return this.httpClient.post<boolean>(url,fd);

  }



  getEmailCheck(email){

    const fd=new FormData();
    fd.append('email',email);
    let url = '/api/emailcheck';

    return this.httpClient.post<boolean>(url,fd);

  }



  register(user: Object){
    console.table(user);
    let url = '/api/register';

    return this.httpClient.post<any>(url, user);
  }
}
