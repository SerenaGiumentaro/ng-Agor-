import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide!: boolean;
  constructor(private http: HttpClient, private loginService: LoginService){}

  onSubmit(form: NgForm) {
    console.log(form.value)
    const params = new HttpParams().set('email',form.value.email ).set('name', form.value.name)
    this.http.get<User[]>('https://gorest.co.in/public/v2/users?', {params}).subscribe({
      next: res => {
        console.log(res)
        if(res.length === 0){
          alert(`L'utente non esiste`)
          return
        }
        localStorage.setItem('user_id', JSON.stringify(res[0].id));
        this.loginService.isLogginIn = true

      },
      error: err => {
        console.log(err)
      }
    })

  }
}
