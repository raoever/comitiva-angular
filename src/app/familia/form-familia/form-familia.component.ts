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
//     this.route.paramMap.subscribe(params => {
//       const candId = params;
//       const id = Number(candId.get("id"));
//       if (id != 0) {
//         this.familiaService.getfamiliaById(Number (id)).subscribe(
//           (candi => {
//             this.familiaForm.patchValue({
//               id: candi.id,
//               nomefamilia: candi.nomefamilia,
//               loginfamilia: candi.loginfamilia,
//               senha: candi.senha,
//               cpf: candi.cpf,
//               rg: candi.rg,
//               dataEmissaoRG: candi.dataEmissaoRG,
//               dataNascimento: candi.dataNascimento,
//               sexo: candi.sexo,
//               estadoCivil: candi.estadoCivil,
//               endereco: candi.endereco,
//               bairro: candi.bairro,
//               cidade: candi.cidade,
//               uf: candi.uf,
//               cep: candi.cep,
//               email: candi.email,
//               telefone: candi.telefone,
//               notificacao: candi.notificacao,
//             });
//             let experiencias = candi.experiencias;
//             for (let experiencia of experiencias) {
//               this.addExperienciaExistente(experiencia);
//             }
//           }),
//           (error: any) => console.log(error)
//         );
//       }
//     });
  }

  dependentes(): FormArray {
    return this.familiaForm.get('dependentes') as FormArray;
  }

  newDependente(): FormGroup {
    return this.fb.group({
      dependenteId: '',
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

  addDependenteExistente(dependente: Dependente) {
    // @ts-ignore
    document.getElementById('divDependente').hidden = false;
    this.dependentes().push(this.fb.group({
      dependenteId: dependente.dependenteId,
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
    console.log(this.familiaForm.value);
    this.familiaService.addFamilia(this.familiaForm.value).subscribe(
      (response: Familia) => {
        console.log(response);
//         this.router.navigate(['/familia/']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
