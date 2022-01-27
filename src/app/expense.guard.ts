import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree  | Promise<boolean>  | UrlTree{
    let url: string = state.url;

    return this.checkLogin(url);
      // return this.authService.isUserRegistered;
  }

  // @ts-ignore
  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url)
    // @ts-ignore
    let val: string = localStorage.getItem('isUserLoggedIn');

    if(val != null && val == "true"){
      if(url == "/login")
        this.router.parseUrl('/table');
      else
        return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
