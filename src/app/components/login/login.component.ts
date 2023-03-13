import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/my-errorstatematcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide!: boolean;
  loading: boolean = false
  constructor(
    private loginService: LoginService,
    private route: Router
  ) {}
  loginForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  // creating form with all the validators for checking inputs
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', [
        Validators.minLength(64),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    this.loading = true

    // Saving the given token in the local storage we can do search with the get call
    localStorage.setItem('token', this.loginForm.value.token);

    // Creating HttpParams to convert the email and name values into a URL-friendly format is necessary for conducting a search to check if a user exists.
    const params = new HttpParams().set('email', this.loginForm.value.email);

    this.loginService.checkUser(params).subscribe({
      next: (res) => {
        console.log(res);
        // check if user exists
        if (res.length === 0) {
          alert(`L'utente non esiste o token non valido`);
          // clear the local storage from token
          localStorage.clear();
          this.loading = false
          return;
        }
        // if user exists save in local storage his is and the token
        localStorage.setItem('user_id', JSON.stringify(res[0].id));
        localStorage.setItem('isLoggedIn', 'true');
        this.route.navigate(['dashboard']);
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Autenticazione fallita, usare un token valido');
        } else {
          console.log(err);
          alert(err.message);
        }
      },
    });
  }
}
