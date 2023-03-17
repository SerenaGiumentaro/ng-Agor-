import { Component , Input, OnInit} from '@angular/core';
import { Comment } from 'src/app/interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
constructor() {

}
@Input() comment: Comment = {
  name: '',
  id: 0,
  post_id: 0,
  email: '',
  body: ''
}

ngOnInit(): void {

}
}
