import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Familia} from "../models/familia"
import {FamiliaService} from "../services/familia.service"
import { jqxGridComponent }  from 'jqwidgets-ng/jqxgrid';
// import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FamiliaComponent {
familias: any[] = [];
// @ts-ignore
@ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
editrow: number = -1;

constructor(private familiaService: FamiliaService) { }

ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getFamilias();
    }

  source: any = {
    localdata: null,
    datafields: [
      { name: '_id', type: 'string' },
      { name: 'nomePai', map: 'pai>nomePai', type: 'string' },
      { name: 'contatoPai', map: 'pai>contatoPai', type: 'string' },
      { name: 'nomeMae', map: 'mae>nomeMae', type: 'string' },
      { name: 'contatoMae', map: 'mae>contatoMae', type: 'string' },
      { name: 'endereco', type: 'string' },
      { name: 'dependentes', type: 'object' },
    ],
    datatype: 'json',
  };

  familiasAdapter: any = new jqx.dataAdapter(this.source);

  getWidth(): any {
//     if (document.body.offsetWidth < 850) {
//       return '100%';
//     }
    return '100%';
  }

  dependentesSource: any = {
      datafields: [
        { name: 'nomeDependente', type: 'object' },
        { name: 'parentesco', type: 'object' },
      ],
      datatype: 'json',
  };

  dependentesDataAdapter = new jqx.dataAdapter(this.dependentesSource, {
      autoBind: true,
  });

  nestedGrids: any[] = new Array();

  initRowDetails = (
    index?: number,
    parentElement?: any,
    gridElement?: any,
    record?: any
  ): void => {
    let id = record.uid.toString();
    let nestedGridContainer = parentElement.children[0];
    if (index != undefined)
    this.nestedGrids[index] = nestedGridContainer;
    let filtergroup = new jqx.filter();
    let filter_or_operator = 1;
    let filtervalue = id;
    let filtercondition = 'equal';
    let filter = filtergroup.createfilter(
      'stringfilter',
      filtervalue,
      filtercondition
    );
    // fill the dependentes depending on the id.
    let familias = this.familiasAdapter.records;
    let dependentesbyid = [];
    for (let i = 0; i < familias.length; i++) {
      if (index != undefined){
        if (familias[i]._id == familias[index]._id) {
          let dependentes = familias[i].dependentes;
          for (let j = 0; j < dependentes.length; j++) {
            dependentesbyid.push(dependentes[j]);
          }
        }
      }
    }
    let dependentesSource = {
      datafields: [
        { name: 'nomeDependente', type: 'object' },
        { name: 'parentesco', type: 'object' },
      ],
      localdata: dependentesbyid,
    };
    let nestedGridAdapter = new jqx.dataAdapter(dependentesSource);
    if (nestedGridContainer != null) {
      let settings = {
        theme: 'material',
        width: 780,
        height: 200,
        source: nestedGridAdapter,
        columns: [
          { text: 'Dependentes', datafield: 'nomeDependente', width: 200 },
          { text: 'Parentesco', datafield: 'parentesco', width: 200 },
        ],
      };

      jqwidgets.createInstance(
        `#${nestedGridContainer.id}`,
        'jqxGrid',
        settings
      );
    }
  };

  renderer = (row: number, column: any, value: string): string => {
    return (
      '<span style="margin-left: 4px; margin-top: 9px; float: left;">' +
      value +
      '</span>'
    );
  };

  rowdetailstemplate: any = {
    rowdetails: '<div id="nestedGrid" style="margin: 10px;"></div>',
    rowdetailsheight: 220,
    rowdetailshidden: true,
  };

  ready = (): void => {
    this.myGrid.showrowdetails(1);
  };

  columns: any[] = [
      //{ text: 'ID', datafield: '_id', width: '40%' },
      { text: 'Pai', datafield: 'nomePai', width: '20%' },
      { text: 'Contato', datafield: 'contatoPai', width: '10%' },
      { text: 'Mãe', datafield: 'nomeMae', width: '20%' },
      { text: 'Contato', datafield: 'contatoMae', width: '10%' },
      { text: 'Encereço', datafield: 'endereco', width: '20%' },
      {
        text: 'Edit',
        datafield: 'Edit',
        columntype: 'button',
        width: '10%',
        cellclassname: 'special',
        cellsrenderer: (): string => {
          return 'Editar';
        },
        buttonclick: (row: number): void => {
          //get the data and append in to the inputs
          this.editrow = row;
          let dataRecord = this.myGrid.getrowdata(this.editrow);
          alert('edita: ' + dataRecord._id);
        },
      },
      {
        text: 'Apagar',
        datafield: 'Apagar',
        columntype: 'button',
        width: '10%',
        cellsrenderer: (): string => {
          return 'Apagar';
        },
        buttonclick: (row: number): void => {
          this.editrow = row;
          let dataRecord = this.myGrid.getrowdata(this.editrow);
          this.familiaService.delFamilia(dataRecord._id);
        },
      },
    ];

  getFamilias() {
    this.familiaService.getFamilias().subscribe((familias: Familia[]) => {
      this.source.localdata = familias;
//       this.dependentesSource.localdata = familias;
      console.log(familias);
      this.myGrid.updatebounddata();
    });
  }

  btnOnClick() {
          let gridContent = this.myGrid.exportdata('html');
          // @ts-ignore
          let newWindow = window.open('', '', 'width=800, height=500'),
          // @ts-ignore
              document = newWindow.document.open(),
              pageContent =
                  '<!DOCTYPE html>\n' +
                  '<html>\n' +
                  '<head>\n' +
                  '<meta charset="utf-8" />\n' +
                  '<title>jQWidgets Grid</title>\n' +
                  '</head>\n' +
                  '<body>\n' + gridContent + '\n</body>\n</html>';
          document.write(pageContent);
          document.close();
          // @ts-ignore
          newWindow.print();

}
}
