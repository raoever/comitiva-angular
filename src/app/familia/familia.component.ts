import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Familia} from "../models/familia"

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent {
//   @ts-ignore
  famsilias: Observable<Familia[]>;
  displayedColumns = ['endereco', 'nomePai', 'nomeMae', 'acoes'];

  isEditable: boolean = true;
    // @ts-ignore
    firstFormGroup: FormGroup;
    // @ts-ignore
    secondFormGroup: FormGroup;
    // @ts-ignore
//     @ViewChild('form') form;

//      constructor(public dialog: MatDialog,
//       private router: Router, private _formBuilder: FormBuilder) {
//         this.candidatos = this.candidatoService.getCandidatos()
//           .pipe(
//             catchError(error => {
//               console.log(error);
//               return of([])
//             })
//           );
//       }
//
//   ngOnInit(): void {
//       this.firstFormGroup = this._formBuilder.group({
//         tipo: [''],
//       });
//       this.secondFormGroup = this._formBuilder.group({
//         parametro: [''],
//       });
//     }

todasFamilias() {
//     this.candidatos = this.candidatoService.getCandidatos();
  }
}
