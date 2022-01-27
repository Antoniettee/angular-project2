import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Table} from "../table/table.model";
import {TableService} from "../table/table.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  submitted = false;
  tableModel= new Table('','','',0)
   id:number = Number();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private table:TableService,
              private _snackBar: MatSnackBar,
              public dialogbox:MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  formForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id= params['id']
    });
    if (this.id){
      this.table.getTable(this.id).subscribe((result)=>{
        this.formForm.patchValue(result)
      })
    }
  }
  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }


  onSubmit() {
    if (this.id) {
      console.log(this.formForm.value);
      this.table.update(this.id, this.formForm.value)
        .subscribe(() => {
          this._snackBar.open(' Updated Successfully', 'Close', {
            duration: 3000,
            verticalPosition: "bottom",

          });
          this.router.navigate(['table']);
        });
    } else {
      console.log(this.formForm.value)
      this.table.create(this.formForm.value)
        .subscribe((response) => {
            console.log(response);

            this._snackBar.open(' Added Successfully', 'Close', {
              duration: 3000,
              verticalPosition: "bottom"
            });
            this.router.navigate(['table']);

          },
          () => {
            alert('Something went wrong')
            this._snackBar.open('Something went wrong', 'Close', {
              duration: 3000,
              verticalPosition: "bottom"
            });
            this.refresh();
          })
    }
  //   this.submitted = true;
  //
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  // console.log(this.loginForm.value);
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }

  onNoClick() {
    this.router.navigateByUrl('table')
  }
  refresh(): void {
    window.location.reload();
  }
}
