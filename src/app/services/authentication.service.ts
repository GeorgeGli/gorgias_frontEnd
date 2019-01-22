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

        let url = 'http://localhost:8080/jplWebService/user';
      return this.httpClient.get(url, {headers, responseType: 'text'});
  }

  getUserProjects(){
        let url = 'http://localhost:8080/jplWebService/userProjects';
    return this.httpClient.get<string[]>(url);
  }

  logout(){
    let url = 'http://localhost:8080/jplWebService/logout';
    sessionStorage.removeItem('sesID');
return this.httpClient.get(url,{ responseType: 'text'});
  }

  getUsernameCheck(username){

    const fd=new FormData();
    fd.append('username',username);
    let url = 'http://localhost:8080/jplWebService/usernamecheck';

    return this.httpClient.post<boolean>(url,fd);

  }

  getEmailCheck(email){

    const fd=new FormData();
    fd.append('email',email);
    let url = 'http://localhost:8080/jplWebService/emailcheck';

    return this.httpClient.post<boolean>(url,fd);

  }

  register(user: Object){
    console.table(user);
    let url = 'http://localhost:8080/jplWebService/reg';

    return this.httpClient.post<any>(url, user);
  }
}
