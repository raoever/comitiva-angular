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
