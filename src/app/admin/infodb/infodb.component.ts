import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'infodb',
  templateUrl: './infodb.component.html',
  styleUrls: ['./infodb.component.css']
})
export class InfodbComponent implements OnInit {

  public stats=[];
  public users_size:number;
  public bgcolor=[];
  public px:number=3;

  public pieChartType = 'pie';
  public chartOptions: any = {
                    responsive: true,
                    legend:false,
                    maintainAspectRatio: false
                  }
  

  public pieChartData = [];
  public pieChartLabels = ['users', 'folders', 'files'];
  public pieChartColors: Array<any> = [
    {     
      backgroundColor: ['#b3c6ff','#ffbf80','#df9fbf'],
      hoverBackgroundColor: ['#80bfff', '#ffccff', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 1,
    }
  ];

  

  public pieUsersData = [];
  public pieUserslabels=[];
  public chartUsersColors: Array<any> = [
    {     
      backgroundColor: this.bgcolor,
      hoverBackgroundColor: ['#80bfff', '#ffccff', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 1,
    }
  ];
  



  constructor(private service: AdminService) {}

  ngOnInit() {

    this.service.getdbStats()
                .subscribe((res)=>{
                  this.pieChartData=Object.values(res);
                  this.pieChartLabels=Object.keys(res); 
                                
                  },
                  (error)=>{
                    console.log('error: '+error);
                  })

                  
  

    this.service.getUsersStats()
                .subscribe((res:any)=>{

                    this.pieUsersData=Object.values(res);
                    this.pieUserslabels=Object.keys(res);
                    this.users_size=this.pieUsersData.length;
                    this.getRandomColor(this.users_size);     
                                       
                    },
                    (error)=>{
                      console.log('error: '+error);
                    })

   
  }

 
 
 

  getRandomColor(sz:number) {

    for (let _i = 0; _i < sz; _i++){
      let color = Math.floor(0x1000000 * Math.random()).toString(16);
      let colorcode = '#' + ('000000' + color).slice(-6);

      this.bgcolor.push(colorcode);

    }
    
    return this.bgcolor;
   
    }







    

    
}
