import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { LoginService } from 'src/app/login-signup/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private loginService: LoginService, private dialog: MatDialog){}
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

