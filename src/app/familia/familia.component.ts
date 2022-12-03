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
      { name: 'nomePai', map: 'pai>nomePai', type: 'string' },
      { name: 'contatoPai', map: 'pai>contatoPai', type: 'string' },
      { name: 'nomeMae', map: 'mae>nomeMae', type: 'string' },
      { name: 'contatoMae', map: 'mae>contatoMae', type: 'string' },
      { name: 'endereco', type: 'string' },
    ],
    datatype: 'json',
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  getWidth(): any {
//     if (document.body.offsetWidth < 850) {
//       return '100%';
//     }
    return '100%';
  }


  cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any, rowdata: any): string => {
          if (value < 20) {
              return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
          }
          else {
              return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
          }
      };


//
//
//   dependentesSource: any = {
//       localdata: null,
//       datafields: [
//         { name: 'nomePai', map: 'pai>nomePai', type: 'string' },
//         { name: 'contatoPai', map: 'pai>contatoPai', type: 'string' },
//         { name: 'nomeMae', map: 'mae>nomeMae', type: 'string' },
//         { name: 'contatoMae', map: 'mae>contatoMae', type: 'string' },
//         { name: 'endereco', type: 'string' },
//       ],
//       datatype: 'json',
//     };
//
//
//
//   dependentesDataAdapter = new jqx.dataAdapter(this.dependentesSource, { autoBind: true });
//       nestedGrids: any[] = new Array();
//       // create nested grid.
//       initRowDetails = (index: number, parentElement: any, gridElement: any, record: any): void => {
//           let id = record.uid.toString();
//           let nestedGridContainer = parentElement.children[0];
//           this.nestedGrids[index] = nestedGridContainer;
//           let filtergroup = new jqx.filter();
//           let filter_or_operator = 1;
//           let filtervalue = id;
//           let filtercondition = 'equal';
//           let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
//           // fill the dependentes depending on the id.
//           let dependentes = this.dependentesDataAdapter.records;
//           let dependentesbyid = [];
//           for (let i = 0; i < dependentes.length; i++) {
//               let result = filter.evaluate(dependentes[i]['_id']);
//               if (result)
//                   dependentesbyid.push(dependentes[i]);
//           }
//           let dependentesSource = {
//               datafields: [
//                  { name: 'nomePai', map: 'pai>nomePai', type: 'string' },
//                          { name: 'contatoPai', map: 'pai>contatoPai', type: 'string' },
//                          { name: 'nomeMae', map: 'mae>nomeMae', type: 'string' },
//                          { name: 'contatoMae', map: 'mae>contatoMae', type: 'string' },
//                          { name: 'endereco', type: 'string' }
//               ],
//               id: '_id',
//               localdata: dependentesbyid
//           }
//           let nestedGridAdapter = new jqx.dataAdapter(dependentesSource);
//           if (nestedGridContainer != null) {
//               let settings = {
//                   width: 780,
//                   height: 200,
//                   source: nestedGridAdapter,
//                   columns: [
//                       { text: 'Pai', datafield: 'nomePai', width: '20%' },
//                       { text: 'Contato', datafield: 'contatoPai', width: '10%' },
//                       { text: 'Mãe', datafield: 'nomeMae', width: '20%' },
//                       { text: 'Contato', datafield: 'contatoMae', width: '10%' },
//                       { text: 'Encereço', datafield: 'endereco', width: '30%' },
//                       { text: 'Ações', width: '10%' },
//                     ]
//               };
//               jqwidgets.createInstance(`#${nestedGridContainer.id}`, 'jqxGrid', settings);
//           }
//         }
//
// photoRenderer = (row: number, column: any, value: string): string => {
//         let name = this.myGrid.getrowdata(row).FirstName;
//         let imgurl = './../../../images/' + name.toLowerCase() + '.png';
//         let img = '<div style="background: white;"><img style="margin: 2px; margin-left: 10px;" width="32" height="32" src="' + imgurl + '"></div>';
//         return img;
//     }
//     renderer = (row: number, column: any, value: string): string => {
//         return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + value + '</span>';
//     }
//     rowdetailstemplate: any = {
//         rowdetails: '<div id="nestedGrid" style="margin: 10px;"></div>', rowdetailsheight: 220, rowdetailshidden: true
//     };
//     ready = (): void => {
//         this.myGrid.showrowdetails(1);
//     };
//






  columns: any[] = [
    { text: 'Pai', datafield: 'nomePai', width: '20%' },
    { text: 'Contato', datafield: 'contatoPai', width: '10%' },
    { text: 'Mãe', datafield: 'nomeMae', width: '20%' },
    { text: 'Contato', datafield: 'contatoMae', width: '10%' },
    { text: 'Encereço', datafield: 'endereco', width: '30%' },
    { text: 'Ações', width: '10%' },
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
