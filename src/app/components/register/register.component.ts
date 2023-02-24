import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/my-errorstatematcher';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router) {}

  registerForm!: FormGroup;
  hide!: boolean;
  selectedGender!: string;
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
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
    console.log(this.registerForm.value);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.registerForm.value.token}`,
    });

    this.http
      .post<User>(
        'https://gorest.co.in/public/v2/users',
        {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          gender: this.registerForm.value.gender,
          status: 'active',
        },
        { headers }
      )
      .subscribe({
        next: (res: User) => {
          alert('Nuovo utente creato con successo');
          localStorage.setItem('user_id', JSON.stringify(res.id));
          localStorage.setItem('token', this.registerForm.value.token);
          this.route.navigate(['login']);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            alert('Autenticazione fallita, token non valido');
          }
          if (err.status === 422) {
            alert(`L'utente esiste già`);
          }
        },
      });
  }
}
