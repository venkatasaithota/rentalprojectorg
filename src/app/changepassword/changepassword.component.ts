import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  submit(data){
  this.http.put('nav/changepassword',data).subscribe(res=>{
    console.log(res)
    if(res["message"]=='password changed'){
      this.router.navigate(['/nav/login'])
    }
    else{
      alert(res['message'])
    }
  })
  }
}
