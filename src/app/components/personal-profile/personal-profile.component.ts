import { HttpClient } from '@angular/common/http';
import { Component , OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Post, User } from 'src/app/interface';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})
export class PersonalProfileComponent implements OnInit{
  constructor(private userService: UsersService, private postService: PostService){}


  user: User ={
    name: '',
    email: '',
    status: '',
    gender:'',
    id: 0
  }

  allUserPosts: Post[] = []

  ngOnInit(): void {
    const id: any = localStorage.getItem('user_id')
    this.userService.getUser(id, this.user)
    this.postService.getUserPosts(id).subscribe({
      next: res => {
        this.allUserPosts = [...res]
      },
      error: err => {
        alert(err.message)
      }
    })

  }

}
