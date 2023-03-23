import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../interface';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/my-errorstatematcher';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { usersUlr } from 'src/app/api.config';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: Router,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}
  loading: boolean = false;
  registerForm!: FormGroup;
  hide: boolean = true;
  selectedGender!: string;
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    localStorage.clear();
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(8), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', [
        Validators.minLength(64),
        Validators.required,
      ]),
      gender: new FormControl(''),
    });
  }

  onSubmit() {
    this.loading = true;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.registerForm.value.token}`,
    });

    this.http
      .post<User>(
        `${usersUlr}`,
        {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          gender: this.registerForm.value.gender,
          status: 'active',
        },
        { headers }
      )
      .subscribe({
        next: () => {
          this.dialogService.drawDialog(this.dialog, {
            title: `Nuovo utente creato con successo`,
            body: '',
            isDenialNeeded: false,
          });
          this.route.navigate(['login-signup']);
        },
        error: (err) => {
          this.loading = false;
          switch (err.status) {
            case 401:
              {
                this.dialogService.drawDialog(this.dialog, {
                  title: `Attenzione!`,
                  body: 'Token non valido',
                  isDenialNeeded: false,
                });
              }
              break;
            case 422:
              {
                this.dialogService.drawDialog(this.dialog, {
                  title: `Attenzione!`,
                  body: `L'utente esiste già`,
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
              {
                this.dialogService.drawDialog(this.dialog, {
                  title: `Attenzione!`,
                  body: `Errore sconosciuto`,
                  isDenialNeeded: false,
                });
              }
            }
          }
        },
      });
  }
}
