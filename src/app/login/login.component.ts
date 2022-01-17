import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm: any;

  constructor(private formBuilder: FormBuilder,) {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      message: ['']
    });
  }

  onSubmit() {
    console.log('Your form data : ', this.loginForm.value );
  }
  ngOnInit(): void {
  }

}
