import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Familia} from "../models/familia"
import { jqxGridComponent }  from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
// import { generatedata } from './../../../sampledata/generatedata';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FamiliaComponent {

// @ts-ignore
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;

  columns = [
		{text: 'Id', datafield: 'id'},
		{text: 'Name', datafield: 'name'}
  ];

  source = new jqx.dataAdapter({
		localData: [
		  {id: 1, name: 'Hydrogen'},
		  {id: 2, name: 'Helium'},
		  {id: 3, name: 'Lithium'},
		  {id: 4, name: 'Beryllium'},
		  {id: 5, name: 'Boron'},
		  {id: 6, name: 'Carbon'},
		  {id: 7, name: 'Nitrogen'},
		  {id: 8, name: 'Oxygen'},
		  {id: 9, name: 'Fluorine'},
		  {id: 10, name: 'Neon'},
		  {id: 11, name: 'Sodium'},
		  {id: 12, name: 'Magnesium'},
		  {id: 13, name: 'Aluminum'},
		  {id: 14, name: 'Silicon'},
		  {id: 15, name: 'Phosphorus'},
		  {id: 16, name: 'Sulfur'},
		  {id: 17, name: 'Chlorine'},
		  {id: 18, name: 'Argon'},
		  {id: 19, name: 'Potassium'},
		  {id: 20, name: 'Calcium'}
		]
	 });

	 getWidth() : any {
   		if (document.body.offsetWidth < 850) {
   			return '100%';
   		}

   		return '100%';
   	}

 todasFamilias() {
//     this.candidatos = this.candidatoService.getCandidatos();
  }
}
