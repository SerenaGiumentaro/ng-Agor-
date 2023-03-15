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
  loading: boolean = false
  registerForm!: FormGroup;
  hide!: boolean;
  selectedGender!: string;
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    localStorage.clear()
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
    this.loading = true
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
        next: () => {
          alert('Nuovo utente creato con successo');
          this.route.navigate(['login']);
        },
        error: (err) => {
          console.error(`Register error: ${err.message}`);
          if (err.status === 401) {
            alert('Autenticazione fallita, token non valido');
            this.loading = false
          }
          if (err.status === 422) {
            alert(`L'utente esiste già`);
            this.loading = false
          }
        },
      });
  }
}
