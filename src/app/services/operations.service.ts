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

      let url = 'http://localhost:8080/jplWebService/create';
    return this.httpClient.post(url, fd, { responseType:'text' });
  }

  getProjectFiles(project_name){
        let url = 'http://localhost:8080/jplWebService/projectFiles?project='+project_name;
     return this.httpClient.post<string[]>(url,{});
  }

  getFileContent( filename){
      const fd=new FormData();
      fd.append('filename',filename);

      let url = 'http://localhost:8080/jplWebService/content';
    return this.httpClient.post(url, fd, { responseType:'text' });
  }

  prologQuery(qr: Object){
    console.table(qr);
    const fd=new FormData();

    let url = 'http://localhost:8080/jplWebService/prolog';

    return this.httpClient.post(url, qr, { responseType:'text' });
  }

  uploadFile(file, project){
      console.log("file: "+file);
      console.log("project: "+project);
      const fd=new FormData();
      fd.append('file',file);
      fd.append('project',project);

      let url = 'http://localhost:8080/jplWebService/addfile';
   return this.httpClient.post<string>(url, fd)
              .subscribe((res)=>{
                     console.log(res);
                   });
  }

  dltProj(project){
      const fd=new FormData();
      fd.append('project',project);
        let url = 'http://localhost:8080/jplWebService/deleteproject';
        return this.httpClient.post<string>(url, fd);
  }

  dltFile(filename){
      const fd=new FormData();
      fd.append('filename',filename);
        let url = 'http://localhost:8080/jplWebService/deletefile';
        return this.httpClient.post<string>(url, fd);
  }
}
