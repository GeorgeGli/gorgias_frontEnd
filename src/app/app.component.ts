import { Component} from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private bnIdle: BnNgIdleService, private route: Router){
        this.bnIdle.startWatching(800).subscribe((res)=>{
          if(res){            
                     this.route.navigate(['/logout']);                     
                     
          }
        })
  }


}
