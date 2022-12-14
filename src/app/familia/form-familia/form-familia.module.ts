import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormCandidatoComponent} from "./form-candidato.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { FormFamiliaRoutingModule } from './form-familia-routing.module';


@NgModule({
  declarations: [FormFamiliaComponent],
  imports: [
    CommonModule,
    FormFamiliaRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
  ]
})
export class FormFamiliaModule { }
