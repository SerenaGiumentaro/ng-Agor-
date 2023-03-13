import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment, Post, User } from 'src/app/interface';
import { CommentsService } from 'src/app/services/comments.service';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private loginService: LoginService,
    private commentsService: CommentsService
  ) {}
  hide: boolean = true;
  hasComment: boolean = true;
  @Input() post: Post = {
    id: 0,
    user_id: 0,
    title: '',
    body: '',
  };

  user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };
  allPostComments!: Comment[];
  addingComment!: FormGroup;
  ngOnInit(): void {
    // set up comment form
    this.addingComment = new FormGroup({
      comment: new FormControl(),
    });

    this.userService.getUser(this.post.user_id).subscribe({
      next: (res) => {
        this.user.name = res.name;
      },
      error: () => {
        this.user.name = 'Utente Sconosciuto';
      },
    });
    this.commentsService.getPostComments(this.post.id).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.hasComment = false;
          return;
        }
        this.allPostComments = [...res];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmitComment() {
    console.log(this.loginService.getCurrentUser());
    const currentUser: User[] = this.loginService.getCurrentUser();
    const userName: string = currentUser[0].name;
    const userEmail: string = currentUser[0].email;
    console.log(userEmail, userName);


    this.commentsService
      .postNewComment(
        this.post.id,
        userName,
        userEmail,
        this.addingComment.value.comment
      )
      .subscribe({
        error: (err) => {
          console.error(err);
        },
      });
    this.allPostComments.push({
      id: 0,
      post_id: this.post.id,
      name: userName,
      email: userEmail,
      body: this.addingComment.value.comment,
    });
    this.addingComment.reset();
  }
}
