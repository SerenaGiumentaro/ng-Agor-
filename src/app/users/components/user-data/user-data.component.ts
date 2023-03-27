import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Post, User } from 'src/app/interface';
import { PostService } from 'src/app/posts/services/post.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private postService: PostService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}
  loading: boolean = false;
  havePost!: boolean
  user!: User;
  allPosts!: Post[];
  ngOnInit(): void {
    this.loading = true;
    this.user = this.userService.getSelectedUser();
    this.postService.getUserPosts(this.user.id).subscribe({
      next: (res) => {
        if(res.length === 0){
          this.havePost = false
          this.loading = false
          return
        }
        this.allPosts = res;
        this.havePost = true
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        switch (err.status) {
          case 404:
            {
              this.dialogService.drawDialog(this.dialog, {
                title: `Attenzione!`,
                body: `Utente sconosciuto`,
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
            this.dialogService.drawDialog(this.dialog, {
              title: `Attenzione!`,
              body: `Errore sconosciuto`,
              isDenialNeeded: false,
            });
          }
        }
      },
    });
  }
}
