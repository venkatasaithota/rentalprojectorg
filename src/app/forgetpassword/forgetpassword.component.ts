import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  submit(data)
  {
    this.http.post('/nav/forgotpassword',data).subscribe(res=>{
      console.log(res['message'])
      console.log(res['token'])
      console.log(res['OTP'])
      console.log(res['userName'])
      if(res['message']=="user found")
      {
        this.router.navigate(['/nav/otp'])
      }
      else
      {
        alert(res['message'])
      }
    })
  }
}
