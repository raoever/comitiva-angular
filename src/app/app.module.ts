import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxCheckBoxModule } from 'jqwidgets-ng/jqxcheckbox';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSortModule} from "@angular/material/sort";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from '@angular/material/dialog';
import { ParticipanteComponent } from './participante/participante.component';
import { FamiliaComponent } from './familia/familia.component';
import { FormFamiliaComponent } from './familia/form-familia/form-familia.component';
import {FamiliaModule} from './familia/familia.module';
import {ParticipanteModule} from './participante/participante.module';
import {FamiliaService} from './services/familia.service'



@NgModule({
  declarations: [
    AppComponent,
    ParticipanteComponent,
    FamiliaComponent,
    FormFamiliaComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    jqxGridModule,
    jqxCheckBoxModule,
    jqxButtonModule,
    jqxPanelModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    MatSortModule,
    MatStepperModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
    jqxGridModule,
    FamiliaModule,
    ParticipanteModule,
  ],
  providers: [FamiliaService],
  bootstrap: [AppComponent],
  entryComponents: [ AppComponent ]
})
export class AppModule { }
