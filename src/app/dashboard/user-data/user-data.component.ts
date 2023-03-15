import { Component, OnInit } from '@angular/core';
import { Post, User } from 'src/app/interface';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit{
  constructor(private userService: UsersService, private postService: PostService){}
  user!: User
  allPosts! :Post[]
  ngOnInit(): void {
    this.user = this.userService.getSelectedUser()
    this.postService.getUserPosts(this.user.id).subscribe({
      next: res =>{
        this.allPosts = res
      },
      error: err => console.error(`Post error: ${err.message}`)
    })

  }



}
