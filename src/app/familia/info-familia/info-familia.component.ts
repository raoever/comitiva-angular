import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Familia} from "../../models/familia";

@Component({
  selector: 'app-info-familia',
  templateUrl: './info-familia.component.html',
  styleUrls: ['./info-familia.component.css']
})
export class InfoFamiliaComponent implements OnInit {
  constructor(
      public dialogRef: MatDialogRef<InfoFamiliaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Familia) { }

    ngOnInit(): void {
    }

    cancel(): void {
      this.dialogRef.close();
    }
}
