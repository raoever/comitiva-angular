import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Familia} from "../models/familia"
import {FamiliaService} from "../services/familia.service"
import { jqxGridComponent }  from 'jqwidgets-ng/jqxgrid';
import { InfoFamiliaComponent } from "./info-familia/info-familia.component";

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

constructor(private familiaService: FamiliaService, public dialog: MatDialog, private router: Router) { }

ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getFamilias();
    }

  source: any = {
    localdata: null,
    datafields: [
      { name: '_id', type: 'string' },
      { name: 'endereco', type: 'string' },
      { name: 'paiNome', type: 'string' },
      { name: 'paiNascimento', type: 'string' },
      { name: 'paiTurma', type: 'string' },
      { name: 'paiOcupacao', type: 'string' },
      { name: 'paiContato', type: 'string' },
      { name: 'maeNome', type: 'string' },
      { name: 'maeNascimento', type: 'string' },
      { name: 'maeTurma', type: 'string' },
      { name: 'maeOcupacao', type: 'string' },
      { name: 'maeContato', type: 'string' },
      { name: 'dependentes', type: 'object' },
    ],
    datatype: 'json',
    pagesize: 20,
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
        { name: 'dependenteNome', type: 'object' },
        { name: 'dependenteParentesco', type: 'object' },
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
        { name: 'dependenteNome', type: 'string' },
        { name: 'dependenteParentesco', type: 'string' },
        { name: 'dependenteTurma', type: 'string' },
        { name: 'dependenteContato', type: 'string' },
      ],
      localdata: dependentesbyid,
    };
    let nestedGridAdapter = new jqx.dataAdapter(dependentesSource);
    if (nestedGridContainer != null) {
      let settings = {
        theme: 'material',
        width: '100%',
        autoheight: true,
        autorowheight: true,
        source: nestedGridAdapter,
        columns: [
          { text: 'Dependentes', datafield: 'dependenteNome', width: '40%' },
          { text: 'Parentesco', datafield: 'dependenteParentesco', width: '20%' },
          { text: 'Turma', datafield: 'dependenteTurma', width: '20%' },
          { text: 'Contato', datafield: 'dependenteContato', width: '20%' },
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
    rowdetailsheight: 250,
    rowdetailshidden: true,
  };

  ready = (): void => {
    this.myGrid.showrowdetails(1);
  };

  columns: any[] = [
      //{ text: 'ID', datafield: '_id', width: '40%' },
      { text: 'Pai', datafield: 'paiNome', width: '15%' },
      { text: 'Contato', datafield: 'paiContato', width: '10%' },
      { text: 'Mãe', datafield: 'maeNome', width: '15%' },
      { text: 'Contato', datafield: 'maeContato', width: '10%' },
      { text: 'Encereço', datafield: 'endereco', width: '20%' },
      {
        text: 'Detalhes',
        datafield: 'Detalhes',
        columntype: 'button',
        width: '10%',
        cellsrenderer: (): string => {
          return 'Detalhes';
        },
        buttonclick: (row: number): void => {
          this.editrow = row;
          let dataRecord = this.myGrid.getrowdata(this.editrow);
          console.log(dataRecord._id);

          const dialogRef = this.dialog.open(InfoFamiliaComponent, {
                width: '550px',
                data: dataRecord,
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              });
        },
      },

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
                this.router.navigate(['/formfamilia/', dataRecord._id]);
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
                this.familiaService.delFamilia(dataRecord._id).subscribe(() => console.log("user deleted"));
                window.location.reload();
                alert("Família Deletada.")
              },
            },
    ];

  getFamilias() {
    this.familiaService.getFamilias().subscribe((familias: Familia[]) => {
      this.source.localdata = familias;
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
                  '<body>\n' +
                  '<h1>Lista de Famílias</h1>\n' +
                   gridContent +
                   '\n</body>\n</html>';
          document.write(pageContent);
          document.close();
          // @ts-ignore
          newWindow.print();

}
}
