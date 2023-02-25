import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { Post, User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit{
  constructor(private http: HttpClient, private userService: UsersService){}

  user: User ={
    name: '',
    email: '',
    status: '',
    gender:'',
    id: 0
  }

  allUserPosts!: Post[]
  ngOnInit(): void {
    const id: any = localStorage.getItem('user_id')
    this.userService.getUser(id, this.user)


    this.http.get<Post[]>(`https://gorest.co.in/public/v2/users/${localStorage.getItem('user_id')}/posts`).subscribe({
      next: res => {
        this.allUserPosts = [...res]
      }
    })
  }



}
