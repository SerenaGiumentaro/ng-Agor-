import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.activateRoute.snapshot.paramMap.get('id');
  }
  @Input() user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };
  @Output() updateUser: EventEmitter<number> = new EventEmitter<number>();
  sendUserData() {
    this.userService.selectedUser = this.user;
  }
  deleteUser() {
    let dialogRef = this.dialogService.drawDialog(this.dialog, {
      title: 'Cancella Utente',
      body: `Vuoi cancellare l'utente?`,
      isDenialNeeded: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.userService.deleteUser(this.user.id).subscribe({
          next: () => {
            this.updateUser.emit(this.user.id);
            this.dialogService.drawDialog(this.dialog, {
              title: `Utente eliminato`,
              body: '',
              isDenialNeeded: false,
            });
          },
          error: (err) => {
            if (err.status === 0) {
              this.dialogService.drawDialog(this.dialog, {
                title: 'Errore dal server',
                body: '',
                isDenialNeeded: false,
              });
            }
            console.error(`Delete user error: ${err.message}`);
          },
        });
      }
    });
  }
}
