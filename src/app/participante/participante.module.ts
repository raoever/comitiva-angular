import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipanteRoutingModule } from './participante-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ParticipanteRoutingModule,
    MatTableModule,
        MatCardModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatButtonToggleModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatStepperModule,
        MatSelectModule
  ]
})
export class ParticipanteModule { }
