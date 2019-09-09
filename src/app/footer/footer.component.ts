import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private shared: SharedService) { }

  ngOnInit() {
  }


  getLoginFlag(){
    return this.shared.getLoginFlag();
    }
}
