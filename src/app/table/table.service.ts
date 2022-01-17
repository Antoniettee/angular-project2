import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {Table} from "./table.model";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private url = 'http://localhost:3000/table';
  private ACCEPT_HEADER = new HttpHeaders({'Accept': 'application/json'})
  private ACCEPT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'})
    table: Table [] = []

   public tabel: Table[] = [
    new Table('1','','',0),
   ]

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }

  getAllTable() {
    return this.http.get<Table[]>(this.url);
  }
  getTable(id: number) {
    return this.http.get<Table>(this.url + '/' + id)
  }
  create(table: TableService): Observable<TableService>{
    return this.http.post<TableService>(`${this.url}`,table,{headers: this.ACCEPT_TYPE_HEADER});
  }
  postData(user: Table){
    console.log('hi');
    console.log(user)
    return this.http.post<any>(this.url, user)
  }

  openConfirmDialog(msg: string) {

    return this.dialog.open(DialogComponent, {
      width: "390 px",
      disableClose: true,
      data: {
        message: msg
      }
    })
  }

  deleteTable(id: number) {
    return this.http.delete<TableService>(`${this.url}/${id}`,{headers:this.ACCEPT_HEADER});
  }

  update(id: number, table: Table): Observable<Table> {
    return this.http.put<Table>(`${this.url}/${id}`, table, {headers: this.ACCEPT_TYPE_HEADER});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
