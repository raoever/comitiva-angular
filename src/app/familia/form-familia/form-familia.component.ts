import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {FamiliaService} from "../../services/familia.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Familia} from "../../models/familia";
import {Dependente} from "../../models/dependente";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
// import {error} from "@angular/compiler/src/util";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-form-familia',
  templateUrl: './form-familia.component.html',
  styleUrls: ['./form-familia.component.css']
})
export class FormFamiliaComponent {
  // @ts-ignore
  familia: Observable<familia>;
  name = 'Angular';
  familiaForm: FormGroup;


  constructor(private fb: FormBuilder, private familiaService: FamiliaService, private route: ActivatedRoute, private router: Router) {
    this.familiaForm = this.fb.group({
      id: '',
      endereco: '',
      paiNome: '',
      paiNascimento: '',
      paiTurma: '',
      paiOcupacao: '',
      paiContato: '',
      maeNome: '',
      maeNascimento: '',
      maeTurma: '',
      maeOcupacao: '',
      maeContato: '',
      dependentes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const familiaId = params;
      const id = String(familiaId.get("id"));
      console.log(id);
      if (id.length == 24 ) {
        this.familiaService.getFamiliaById(String (id)).subscribe(
          (familia => {
            this.familiaForm.patchValue({
              id: familia._id,
              endereco: familia.endereco,
              paiNome: familia.paiNome,
              paiNascimento: familia.paiNascimento,
              paiTurma: familia.paiTurma,
              paiContato: familia.paiContato,
              paiOcupacao: familia.paiOcupacao,
              maeNome: familia.maeNome,
              maeNascimento: familia.maeNascimento,
              maeOcupacao: familia.maeOcupacao,
              maeTurma: familia.maeTurma,
              maeContato: familia.maeContato,
            });
            let dependentes = familia.dependentes;
            for (let dependente of dependentes) {
              this.addDependenteExistente(dependente);
            }
          }),
          (error: any) => console.log(error)
        );
      }
    });
  }

  dependentes(): FormArray {
    return this.familiaForm.get('dependentes') as FormArray;
  }

  newDependente(): FormGroup {
    return this.fb.group({
//       dependenteId: '',
      dependenteNome: '',
      dependenteNascimento: '',
      dependenteParentesco: '',
      dependenteTurma: '',
      dependenteContato: '',
      estuda: '',
      escolaridade: '',
      tamanhoPe: '',
      tamanhoCalca: '',
      tamanhoCamisa: ''
    });
  }

  addDependente() {
    // @ts-ignore
    document.getElementById('divDependente').hidden = false;
    this.dependentes().push(this.newDependente());
  }

  removeDependente(i: number) {
    this.dependentes().removeAt(i);
    if (this.dependentes().length === 0){
      // @ts-ignore
      document.getElementById('divDependente').hidden = true;
    }
  }

  addDependenteExistente (dependente: Dependente) {
    // @ts-ignore
    document.getElementById('divDependente').hidden = false;
    this.dependentes().push(this.fb.group({
//       dependenteId: dependente.dependenteId,
      dependenteNome: dependente.dependenteNome,
      dependenteNascimento: dependente.dependenteNascimento,
      dependenteParentesco: dependente.dependenteParentesco,
      dependenteTurma: dependente.dependenteTurma,
      dependenteContato: dependente.dependenteContato,
      estuda: dependente.estuda,
      escolaridade: dependente.escolaridade,
      tamanhoPe: dependente.tamanhoPe,
      tamanhoCalca: dependente.tamanhoCalca,
      tamanhoCamisa: dependente.tamanhoCamisa
    }));
  }


  onSubmit() {
    console.log("submit: ");
    console.log(this.familiaForm.value.id);

    if(this.familiaForm.value.id != null){
    this.familiaService.addFamilia(this.familiaForm.value).subscribe(
          (response: Familia) => {
            console.log("resposta save.");
            console.log(response);
            this.router.navigate(['/familia/']);
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    } else {
    this.familiaService.updateFamilia(this.familiaForm.value).subscribe(
              (response: Familia) => {
                console.log("resposta save.");
                console.log(response);
                this.router.navigate(['/familia/']);
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
            );
    }
  }
}
