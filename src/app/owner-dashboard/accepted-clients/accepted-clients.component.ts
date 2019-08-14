import { Component, OnInit } from '@angular/core';
import { RegistredDataService } from 'src/app/registred-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accepted-clients',
  templateUrl: './accepted-clients.component.html',
  styleUrls: ['./accepted-clients.component.css']
})
export class AcceptedClientsComponent implements OnInit {
  constructor(private register:RegistredDataService,private http:HttpClient) { }
  currentUser:any;

currectUser=this.register.currentUsername[0].name;


  ngOnInit() {
    //console.log(this.register.currentUsername)
    this.http.get(`ownerdashboard/acceptedclients/${this.currectUser}`).subscribe(res=>{
      this.currentUser=res['data']
      //console.log(this.currentUser)
    })
    
  }
}
