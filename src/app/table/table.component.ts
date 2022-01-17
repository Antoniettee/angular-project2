import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TableService} from "./table.service";
import {MatDialog} from "@angular/material/dialog";
import {Table} from "./table.model";


export interface PeriodicElement {
  name: string;
  position: number;
  lastname: string;
  age: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  element: Table[] | undefined
  displayedColumns: string[] = ['id', 'name', 'lastname', 'age','action'];
  tableData: any = [];


  constructor( private router: Router,
               private table: TableService,
               private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.table.getAllTable().subscribe((allData) =>{
      console.log(allData);
      this.tableData= allData;
    });
  }

  onAdd() {
    this.router.navigateByUrl('table/form-form')
  }

  updateTable(element: Table) {
    this.router.navigateByUrl('table/form-form/' + element.id)

  }

  deleteTable(id: number) {
    this.table.openConfirmDialog('Are you sure you want to delete it?')
      .afterClosed().subscribe((res=>{
        if(res){
          this.table.deleteTable(id).subscribe((result) =>{
            console.log(result);
          });
        }
        this.ngOnInit();
    }))
  }
}
