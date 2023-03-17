import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogData } from './interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  drawDialog(dialog: MatDialog, dialogData: DialogData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = dialogData;
    return dialog.open(DialogComponent, dialogConfig);
  }
}
