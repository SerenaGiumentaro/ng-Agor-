import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };

  allUsers!: User[];

  getUser(id: number, user:User) {
    this.http
      .get<User>(`https://gorest.co.in/public/v2/users/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          (user.name = res.name),
            (user.email = res.email),
            (user.status = res.status),
            (user.gender = res.gender);
        },
        error: (err) => {
          alert(err.message);
        },
      });
  }

  getAllUsers(pages: number): User[] | void{
    this.http.get<User[]>(`https://gorest.co.in/public/v2/users?page=${pages}&per_page=20`).subscribe({
      next: res => {
        return res
      },
      error: (err) => {
        alert(err.message)
      }
    })
  }
}
