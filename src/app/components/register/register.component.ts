import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private http: HttpClient, private route: Router) {}
  hide!: boolean;
  selectedGender!: string;
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  matcher = new MyErrorStateMatcher();

  onSubmit(form: NgForm) {
    console.log(form.value);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${form.value.token}`,
    });

    this.http
      .post<User>(
        'https://gorest.co.in/public/v2/users',
        {
          name: form.value.name,
          email: form.value.email,
          gender: form.value.gender,
          status: 'active',
        },
        { headers }
      )
      .subscribe({
        next:(res:User) => {
          alert('Nuovo utente creato con successo');
          localStorage.setItem('user_id', JSON.stringify(res.id));
          localStorage.setItem('token', form.value.token);
          this.route.navigate(['login']);
        },
        error:(err) => {
          console.log(err);
          if (err.status === 401) {
            alert('Autenticazione fallita, token non valido');
          }
          if (err.status === 422) {
            alert(`L'utente esiste già`);
          }
        }
  });
  }
}
