import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface';
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
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private route: Router
  ) {}
  loginForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  // creating form with all the validators for checking inputs
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(8), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', [
        Validators.minLength(64),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    // Creating HttpParams to convert the email and name values into a URL-friendly format is necessary for conducting a search to check if a user exists.
    localStorage.setItem('token', this.loginForm.value.token);

    const params = new HttpParams()
      .set('email', this.loginForm.value.email)
      .set('name', this.loginForm.value.name);
    console.log(params.toString());
    this.http
      .get<User[]>('https://gorest.co.in/public/v2/users?', { params })
      .subscribe({
        next: (res) => {
          console.log(res);
          // check if user exists
          if (res.length === 0) {
            alert(`L'utente non esiste`);
            localStorage.clear()
            return;
          }
          // if user exists save in local storage his is and the token
          localStorage.setItem('user_id', JSON.stringify(res[0].id));
          this.loginService.isLogginIn = true;
          this.route.navigate(['dashboard']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
