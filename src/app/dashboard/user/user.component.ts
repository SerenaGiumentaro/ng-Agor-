import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
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
  drawDialog(data: {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    return this.dialog.open(DialogComponent, dialogConfig);
  }
  deleteUser() {
    let dialogRef = this.drawDialog({
      title: 'Cancella Utente',
      body: `Vuoi cancellare l'utente?`,
      isDenialNeeded: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.userService.deleteUser(this.user.id).subscribe({
          next: () => {
            this.updateUser.emit(this.user.id);
            alert('Utente Eliminato');
          },
          error: (err) => {
            console.error(`Delete user error: ${err.message}`);
          },
        });
      }
      return;
    });
    // aggiungi una dialog di conferma
  }
}
