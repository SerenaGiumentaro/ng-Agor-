import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  constructor(private postService: PostService){}
  newPost!: FormGroup;
  ngOnInit(): void {
    this.newPost = new FormGroup({
      title: new FormControl(),
      body: new FormControl(),
    });
  }

  onNewPostSubmit() {
    const id: any = localStorage.getItem('user_id')
    this.postService.newPost(id, this.newPost.value.title, this.newPost.value.body).subscribe({
      next: () => {
        alert('Il post è stato creato')
        this.newPost.reset()
      },
      error: err => {
        console.error(`New Post error:${err.message}`)
      }
    })
  }
}
