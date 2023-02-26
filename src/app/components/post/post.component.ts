import { Component, OnInit, Input } from '@angular/core';
import { Post, User } from 'src/app/interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  constructor(private userService: UsersService){}
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
  ngOnInit(): void {
    this.userService.getUser(this.post.user_id, this.user)
  }
}
