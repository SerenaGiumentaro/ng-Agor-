import { Component, OnInit, Input } from '@angular/core';
import { Comment, Post, User } from 'src/app/interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  constructor(private userService: UsersService,private commentsService: CommentsService){}
  hide: boolean = true
  @Input() post :Post = {
    id: 0,
    user_id : 0,
    title: '',
    body: ''
  }
  user: User ={
    name: '',
    email: '',
    status: '',
    gender:'',
    id: 0
  }
  allPostComments!: Comment[]
  ngOnInit(): void {
    this.userService.getUser(this.post.user_id).subscribe({
      next: res => {
        this.user.name = res.name
      }
    })
    this.commentsService.getPostComments(this.post.id).subscribe({
      next: res =>{
        this.allPostComments = [...res]
      }
    })
  }
}
