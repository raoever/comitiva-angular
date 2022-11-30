import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Familia} from "../models/familia"
import {FamiliaService} from "../services/familia.service"
import { jqxGridComponent }  from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FamiliaComponent {
familias: any[]= [];
// @ts-ignore
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;

constructor(private familiaService: FamiliaService) { }

ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getFamilias();
  }

  source: any = {
    localdata: null,
    datafields: [
      { name: 'endereco', type: 'string' },
      { name: '_id', type: 'string' },
    ],
    datatype: 'json',
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '100%';
    }
    return '100%';
  }

  columns: any[] = [
    { text: 'Encereço', datafield: 'endereco', width: 260 },
    { text: 'ID', datafield: '_id', width: 300 },
  ];

  getFamilias() {
    this.familiaService.getFamilias().subscribe((familias: Familia[]) => {
      this.source.localdata = familias;
      this.myGrid.updatebounddata();
    });
  }
}
