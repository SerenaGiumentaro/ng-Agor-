import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/dialog.service';
import { Post, User } from 'src/app/interface';
import { PostService } from 'src/app/posts/services/post.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss'],
})
export class PersonalProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private postService: PostService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    this.loading = true;
  }

  loading: boolean = false;
  user: User = {
    name: '',
    email: '',
    status: '',
    gender: '',
    id: 0,
  };
  allUserPosts: Post[] = [];

  ngOnInit(): void {
    const id: any = localStorage.getItem('user_id');
    const currentUser: any = localStorage.getItem('user');
    this.user = JSON.parse(currentUser);
    this.postService.getUserPosts(id).subscribe({
      next: (res) => {
        this.allUserPosts = [...res];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false
        if (err.status === 0) {
          this.dialogService.drawDialog(this.dialog, {
            title: 'Errore dal server',
            body: '',
            isDenialNeeded: false,
          });
        }
      },
    });
  }
}
