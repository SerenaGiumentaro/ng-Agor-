import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private http: HttpClient, private route: Router) {}
  hide!: boolean;
  selectedGender!: string;

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
