import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = ' http://localhost:3000/register';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})


  isUserLoggedIn: boolean = false;
  isUserRegistered: boolean = false;

  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);
    this.isUserLoggedIn = userName == 'anto' && password == 'anto';
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');}


  constructor(private http:HttpClient) { }
 //ndryshimet e reja
  getRegister(){
    return this.http.get(this.url);
  }
  addRegister(data:any){
    return this.http.post(this.url,data)
  }

  register(fullname: string, email:string, password: string): Observable<any> {
    console.log(fullname);
    console.log(email)
    console.log(password);
    this.isUserLoggedIn = fullname == '' && password == '';
    localStorage.setItem('isUserRegistered', this.isUserRegistered ? "true" : "false");

    return of(this.isUserRegistered).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }
}
