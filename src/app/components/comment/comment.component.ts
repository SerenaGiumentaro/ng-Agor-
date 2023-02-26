import { Component , Input, OnInit} from '@angular/core';
import { Comment } from 'src/app/interface';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
constructor() {

}
@Input() comment!: Comment

ngOnInit(): void {

}
}
