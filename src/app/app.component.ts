import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private loginService: LoginService, private dialog: MatDialog) {}
  title = `Agorà`;

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Logout',
      body: `Vuoi uscire dall'applicazione?`,
      isDenialNeeded: true,
    };
    let dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loginService.logout();
      }
      return;
    });
  }
}
