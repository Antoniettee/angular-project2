import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [

  {
    path: '', component:NavbarComponent, children: [
      {path: '', component: HomepageComponent},
      {path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule)},
      {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
