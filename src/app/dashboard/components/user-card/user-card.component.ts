import { Component, Input, OnInit } from '@angular/core';
import { Post, User } from 'src/app/interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{
  @Input() user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };
  loading: boolean = false
  allUserPosts: Post[] = [];

  ngOnInit(): void {
    
  }
}
