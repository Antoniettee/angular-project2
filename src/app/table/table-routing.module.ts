import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent} from "./table.component";
import { FormComponent} from "../form/form.component";
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: "",
    component: TableComponent
  },
  {
    path:"form-form",
    component: FormComponent
   },
  {
    path:"form-form/:id",
    component: FormComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class TableRoutingModule { }
