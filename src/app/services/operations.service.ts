import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private httpClient:HttpClient) {}

  createNewProject(name){
      const fd=new FormData();
      fd.append('project_name',name);

      let url = '/api/create';
    return this.httpClient.post(url, fd, { responseType:'text' });
  }

  getProjectFiles(project_name){
        let url = '/api/projectFiles?project='+project_name;
     return this.httpClient.post<string[]>(url,{});
  }

  getFileContent( filename, project){
      const fd=new FormData();
      fd.append('filename',filename);
      fd.append('project',project);
      let url = '/api/content';
    return this.httpClient.post(url, fd, { responseType:'text' });
  }

  prologQuery(qr: Object){

    let url = '/api/prolog';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  consultViaProj(project, filename){
  
    const fd=new FormData();
    fd.append('filename',filename);
    fd.append('project',project);

    let url = '/api/consultViaProj';

    return this.httpClient.post(url, fd, { responseType:'text' });
  }

  consultQuery(qr: String){

    let url = '/api/consult';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  assertQuery(qr: String){

    let url = '/api/assert';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  assertaQuery(qr: String){

    let url = '/api/asserta';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  abolishQuery(qr: String){

    let url = '/api/abolish';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  unloadQuery(qr: String){

    let url = '/api/unload';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  unloadQueryViaProj(project, filename){
    
    const fd=new FormData();
    fd.append('filename',filename);
    fd.append('project',project);

    let url = '/api/unloadViaProj';

    return this.httpClient.post(url, fd, { responseType:'text' });
  }

  retractQuery(qr: String){

    let url = '/api/retract';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  proveQuery(qr: Object){

    let url = '/api/prove';

    return this.httpClient.post<string[]>(url, qr);
  }

  plgQuery(qr: Object){
    
    let url = '/api/prolog';

    return this.httpClient.post<string[]>(url, qr);
  }

  uploadFile(file, project){

      const fd=new FormData();
      fd.append('file',file);
      fd.append('project',project);

      let url = '/api/addfile';
   return this.httpClient.post<string>(url, fd);
  }
 
  updateFile(file, project){

    const fd=new FormData();
    fd.append('file',file);
    fd.append('project',project);

    let url = '/api/updatefile';
 return this.httpClient.post<string>(url, fd);
}

  dltProj(project){
      const fd=new FormData();
      fd.append('project',project);
        let url = '/api/deleteproject';
        return this.httpClient.post<string>(url, fd);
  }

  dltFile(filename, project){
      const fd=new FormData();
      fd.append('filename',filename);
      fd.append('project',project);
        let url = '/api/deletefile';
        return this.httpClient.post<string>(url, fd);
  }
}
