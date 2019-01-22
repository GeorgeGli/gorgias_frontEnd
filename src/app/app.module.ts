import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthenticationService } from './services/authentication.service';
import { SharedService } from './services/shared.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { OperationsService } from './services/operations.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { PanelComponent } from './panel/panel.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddfileComponent } from './addfile/addfile.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ContentComponent } from './content/content.component';
import { CreateComponent } from './create/create.component';
import { FilesComponent } from './files/files.component';
import { DelprojComponent } from './delproj/delproj.component';
import { DelfileComponent } from './delfile/delfile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomepageComponent,
    PanelComponent,
    ProjectsComponent,
    AddfileComponent,
    LogoutComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    AuthenticationComponent,
    ContentComponent,
    CreateComponent,
    FilesComponent,
    DelprojComponent,
    DelfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    CKEditorModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:WelcomepageComponent
      },
      {
        path:'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'files/:project',
        component: FilesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'content/:filename',
        component: ContentComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'panel',
        component: PanelComponent,
        canActivate: [AuthGuardService]
      },
      {
        path:'logout',
        component: LogoutComponent,
        canActivate: [AuthGuardService]
      },
    ])
  ],
  providers: [
    SharedService,
    OperationsService,
    AuthenticationService,
    AuthInterceptorService,
     { provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptorService,
       multi: true
     },
     { provide: HTTP_INTERCEPTORS,
       useClass: ErrorInterceptorService,
       multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
