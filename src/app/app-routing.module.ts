import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {LogoutComponent} from "./logout/logout.component";
import {LoginComponent} from "./login/login.component";
import {ExpenseGuard} from "./expense.guard";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [

  {
    path: '', component:NavbarComponent, children: [
      {path: '', component: HomepageComponent},
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      {path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule),canActivate: [ExpenseGuard]},
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
      { path: '', redirectTo: 'table', pathMatch: 'full' },
      {path: 'register', component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
