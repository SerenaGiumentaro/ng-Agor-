import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { Post, User } from 'src/app/interface';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit{
  constructor(private http: HttpClient){}

  user: User = {
    name: '',
    email: '',
    status: '',
    gender:'',
    id: 0
  }

  allUserPosts!: Post[]
  ngOnInit(): void {
    this.http.get<User>(`https://gorest.co.in/public/v2/users/${localStorage.getItem('user_id')}`).subscribe({
      next: res => {
        this.user.name = res.name,
        this.user.email = res.email,
        this.user.status = res.status,
        this.user.gender = res.gender
      },
      error: err => {
        alert(err.message)
      }
    })

    this.http.get<Post[]>(`https://gorest.co.in/public/v2/users/${localStorage.getItem('user_id')}/posts`).subscribe({
      next: res => {
        this.allUserPosts = [...res]
      }
    })
  }



}
