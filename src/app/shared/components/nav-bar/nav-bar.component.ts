import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/login-signup/services/login.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  title = `Agorà`;

  logout() {
    const dialogConfig = {
      title: 'Logout',
      body: `Vuoi uscire dall'applicazione?`,
      isDenialNeeded: true,
    };
    let dialogRef = this.dialogService.drawDialog(this.dialog, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loginService.logout();
      }
      return;
    });
  }
}
