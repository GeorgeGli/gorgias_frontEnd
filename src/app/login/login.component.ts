import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  closeModal = new EventEmitter<any>();
  loginForm: FormGroup;
  credentials:any = {username:'', password:''};
   success:boolean=true;


  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router:Router, private shared: SharedService) {
    this.loginForm = fb.group({
          'userName': [null, Validators.required],
          'passWord': [null, Validators.required]
         });
  }

  ngOnInit() {
  }

  login(cred){

    this.credentials.username = cred.userName;
    this.credentials.password = cred.passWord;

    this.auth.authenticate(this.credentials)
             .subscribe((response)=>{
                              this.closeModal.next();

                              this.router.navigate(['/panel']);
                              this.shared.setLoginFlag(true);
                              sessionStorage.setItem('sesID',JSON.stringify(response));
                        },
                        (error)=>{console.log(error);
                                 this.success=false});
  }


}
