import { Component, OnInit } from '@angular/core';
import { RegistredDataService } from 'src/app/registred-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  constructor(private register:RegistredDataService,private http:HttpClient) { }
  currentUser:any;
  currectUser:any;



  ngOnInit() {
    //console.log(this.register.currentUsername)
    this.currectUser=this.register.getUser().name;
    this.http.get(`ownerdashboard/viewprofile/${this.currectUser}`).subscribe(res=>{
      if (res['data']=='unauthorizated access')
      {
        alert('unauthorized access')
      }
      else
      {
      this.currentUser=res['data']
      }
    
      })
    
  }

}
