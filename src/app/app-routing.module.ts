import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FamiliaComponent} from "./familia/familia.component"
import {FormFamiliaComponent} from "./familia/form-familia/form-familia.component"
import {ParticipanteComponent} from "./participante/participante.component"

const routes: Routes = [
  {path: 'familia', component: FamiliaComponent},
  {path: 'formfamilia', component: FormFamiliaComponent},
  {path: 'formfamilia/:id', component: FormFamiliaComponent},
  {path: 'participante', component: ParticipanteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
