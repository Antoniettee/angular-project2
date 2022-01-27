import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "./registration.service";
import {first} from "rxjs";
import {LoginService} from "../login/login.service";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerForm: any;
   fullname: any;
   email: any;
   password: any;
   id:any = 4;



  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private registrationService: RegistrationService,
              private loginService: LoginService,
              private authService: AuthService,
              private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.required]
  })
    // this.registerForm = new FormGroup({
    //   fullname: new FormControl(""),
    //   email: new FormControl(""),
    //   password: new FormControl()
    // });
  }

  signUp(data: any){
    console.log(data);
    //ndryshime te tjera
    let dataToPass = {
      fullname:data.fullname,
      email:data.email,
      password:data.password,
      id:this.id++
    }
    this.authService.addRegister(dataToPass).subscribe((data:any)=>{
      console.log(data);
    })
    this.http.post<any>("http://localhost:3000/register", this.registerForm.value)
      .subscribe(res=>{
        alert("Register Sucessfull");
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },error => {
        alert("Something went wrong")
        }
      )
  }

  onClickSubmit(data: any) {
    this.fullname = data.fullname;
    this.email = data.email;
    this.password = data.password;

    console.log("Register page" + this.fullname);
    console.log("Register page" + this.email);
    console.log("Register page" + this.password);

    this.authService.register(this.fullname , this.email, this.password)
      .subscribe(data=> {
        console.log("Is register Success:" + data);

        if(data)this.router.navigate(['/login']);
      });
  }
}
