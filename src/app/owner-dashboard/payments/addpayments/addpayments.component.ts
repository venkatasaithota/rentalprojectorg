import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistredDataService } from 'src/app/registred-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpayments',
  templateUrl: './addpayments.component.html',
  styleUrls: ['./addpayments.component.css']
})
export class AddpaymentsComponent implements OnInit {

  constructor(private http:HttpClient,private register:RegistredDataService,private router:Router) { }

  ngOnInit() {
  }
  addpayment(data)
  {
    if(data.accno==''||data.ifsccode==''){
      alert('account number and ifsc code is mandatory')
    }
    else{
      //console.log(data)
      data.ownername=this.register.currentUsername[0].name
      this.http.post('/ownerdashboard/addpayments/',data).subscribe((res)=>{
        alert(res["message"])
        this.router.navigate(['/ownerdashboard/viewpayments'])
      })
    }
    
  }

}
