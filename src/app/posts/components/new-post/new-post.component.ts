import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { PostService } from 'src/app/posts/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<NewPostComponent>
  ) {}
  loading: boolean = false;
  newPost!: FormGroup;
  ngOnInit(): void {
    this.newPost = new FormGroup({
      title: new FormControl(),
      body: new FormControl(),
    });
  }

  onNewPostSubmit() {
    this.loading = true;
    const id: any = localStorage.getItem('user_id');
    this.postService
      .newPost(id, this.newPost.value.title, this.newPost.value.body)
      .subscribe({
        next: () => {
          this.loading = false;
          this.dialogService.drawDialog(this.dialog, {
            title: `Il post è stato creato con successo`,
            body: '',
            isDenialNeeded: false,
          });
          this.dialogRef.close();
        },
        error: (err) => {
          this.loading = false;
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
  }
}
