import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormControl, FormGroup,Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   formData: any;
   userName: any;
   password: any;
   submitted: any;
   loginForm: any;

  constructor(private formBuilder: FormBuilder,
              private authService : AuthService,
              private http : HttpClient,
              private router : Router) {
  }
  ngOnInit(): void {
    this.formData = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl(""),
    });
  }
  login(){
    this.http.get<any>("http://localhost:3000/login")
      .subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.userName === this.formData.value.userName && a.password === this.formData.value.password
        });
        if(user){
          alert("Login Secces");
          this.formData.reset();
          this.router.navigate(['/table'])
        }else{
          alert("User not found");
        }
      }, error => {
        alert("Something went wrong")
      })
  }
  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
      .subscribe( data => {
        console.log("Is Login Success: " + data);

        if(data) this.router.navigate(['/table']);
      });
  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
