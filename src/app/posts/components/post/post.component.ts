import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Comment, Post, User } from 'src/app/interface';
import { CommentsService } from 'src/app/posts/services/comments.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private commentsService: CommentsService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}
  hide: boolean = true;
  hasComment: boolean = true;
  @ViewChild('commentInput') commentInput!: ElementRef;
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
  allPostComments: Comment[] = [];
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
      error: (err) => {
        if (err.status === 404) {
          this.user.name = 'Utente Sconosciuto';
        }
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
        console.error(`Comment error: ${err.message}`);
      },
    });
  }

  onSubmitComment() {
    const currentUser: any = localStorage.getItem('user');
    const user = JSON.parse(currentUser);
    const userName = user.name;
    const userEmail = user.email;

    this.commentsService
      .postNewComment(
        this.post.id,
        userName,
        userEmail,
        this.addingComment.value.comment
      )
      .subscribe({
        error: (err) => {
          switch (err.status) {
            case 422:
              {
                this.dialogService.drawDialog(this.dialog, {
                  title: `Attenzione!`,
                  body: `Dati mancanti`,
                  isDenialNeeded: false,
                });
              }
              break;
            case 0:
              {
                this.dialogService.drawDialog(this.dialog, {
                  title: `Attenzione!`,
                  body: `Errore del server`,
                  isDenialNeeded: false,
                });
              }
              break;
            default: {
              {
                this.dialogService.drawDialog(this.dialog, {
                  title: `Attenzione!`,
                  body: `Errore sconosciuto`,
                  isDenialNeeded: false,
                });
              }
            }
          }
        },
      });
    this.allPostComments.push({
      id: 0,
      post_id: this.post.id,
      name: userName,
      email: userEmail,
      body: this.addingComment.value.comment,
    });
    this.hasComment = true;
    this.hide = false;
    this.addingComment.reset();
    this.commentInput.nativeElement.blur();
  }
}
