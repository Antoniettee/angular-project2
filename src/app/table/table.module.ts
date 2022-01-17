import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatListModule} from "@angular/material/list";
import {TableComponent} from "./table.component";
import {FormComponent} from "../form/form.component";
import {TableRoutingModule} from "./table-routing.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


const MaterialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatSortModule,
  MatCardModule,
  ReactiveFormsModule,
]
@NgModule({
  declarations: [TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    MaterialModules,
    TableRoutingModule,
    FormsModule,

  ],

  exports: [
    TableComponent,
    FormComponent
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: []
  },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    }]
})
export class TableModule { }
