import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{


  @Input() post :Post = {
    id: 0,
    user_id : 0,
    title: '',
    body: ''
  }

  ngOnInit(): void {
    this.post.user_id
  }
}
