import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  submit(OTP){
      this.http.post('nav/verifyotp',OTP).subscribe(res=>{
        console.log(res)
        if(res['message']=='verifiedOTP')
        {
          this.router.navigate(['/nav/changepassword'])
        }
        else
        {
          alert(res['message'])
          this.router.navigate(['/nav/forgetpassword'])
        }
      })
  }
}
