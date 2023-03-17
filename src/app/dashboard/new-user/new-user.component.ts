import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/dialog.service';
import { UserBody } from 'src/app/interface';
import { MyErrorStateMatcher } from 'src/app/my-errorstatematcher';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}
  loading: boolean = false;
  newUserForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(8), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl(''),
    });
  }

  onSubmitNewUser() {
    this.loading = true;
    const user: UserBody = {
      name: this.newUserForm.value.name,
      email: this.newUserForm.value.email,
      gender: this.newUserForm.value.gender,
      status: 'active',
    };
    this.userService.newUser(user).subscribe({
      next: () => {
        this.loading = false;
        this.newUserForm.reset();
        Object.keys(this.newUserForm.controls).forEach((key) => {
          this.newUserForm.get(key)?.setErrors(null);
        });
        this.dialogService.drawDialog(this.dialog, {
          title: `Nuovo utente creato con successo`,
          body: '',
          isDenialNeeded: false,
        });
      },
      error: (err) => {
        this.loading = false;
        switch (err.status) {
          case 422:
            {
              this.dialogService.drawDialog(this.dialog, {
                title: `Attenzione!`,
                body: `Dati mancanti`,
                isDenialNeeded: false,
              });
            }
            break;
          case 0:
            {
              this.dialogService.drawDialog(this.dialog, {
                title: `Attenzione!`,
                body: `Errore del server`,
                isDenialNeeded: false,
              });
            }
            break;
          default: {
            this.dialogService.drawDialog(this.dialog, {
              title: `Attenzione!`,
              body: `Errore sconosciuto`,
              isDenialNeeded: false,
            });
          }
        }
      },
    });
  }
}
