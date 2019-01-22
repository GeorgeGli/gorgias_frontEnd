import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from '../../../node_modules/rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
import { User } from '../models/user';
import { NgbAlertConfig } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

success:boolean=false;
regForm:FormGroup;
user: User={ u_id:0,
             username:'',
             password:'',
             fname:'',
             lname:'',
             email:'',
             enabled:false,
             unlocked:false
           };

  constructor(private fb:FormBuilder, private service: AuthenticationService, private router: Router, alertConfig: NgbAlertConfig) {
             
            this.regForm = fb.group({
                              'username': [null, Validators.compose([Validators.required, Validators.maxLength(45)]), this.existingUsernameValidator()],
                              'password': [null, Validators.compose([Validators.required, Validators.maxLength(45)])],
                              're_password': [null, Validators.compose([Validators.required])],
                              'fname': [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
                              'lname': [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
                              'email': [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(45)]), this.existingEmailValidator()]
                              },{validator:this.mismatchValidator});
       }

 regUser(u){

            this.user.username = u.username;
            this.user.password = u.password;
            this.user.fname = u.fname;
            this.user.lname = u.lname;
            this.user.email= u.email;
            this.user.enabled=false;
            this.user.unlocked=false;
            console.log(this.user);

      return this.service.register(this.user)
                         .subscribe(res=>{alert(res);
                                      if (res="OK"){
                                        this.success=false;
                                    }},
                                    error=>{alert("Not succesfull registration!");
                                       console.log(error)
                                    })
}


  existingUsernameValidator(): AsyncValidatorFn{

      return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

                  return this.service.getUsernameCheck(control.value)
                                .pipe(map(
                                      res => {
                                            return res ? {"usernameExists": true} : null;}
                                          ))
                  }


      }

  mismatchValidator:ValidatorFn = (control:AbstractControl): {[key: string]:boolean} =>{

          let password=control.get('password').value;
          let repassword=control.get('re_password').value;

          if (password!=repassword){

            return { 'mismatch': true}
          }
    return null;
  }


existingEmailValidator(): AsyncValidatorFn{

  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

              return this.service.getEmailCheck(control.value)
                            .pipe(map(
                                  res => {
                                        return res ? {"emailExists": true} : null;}
                                      ))
              }
}



}
