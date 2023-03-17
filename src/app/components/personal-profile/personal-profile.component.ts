import { Component, OnInit , AfterViewInit} from '@angular/core';
import { Post, User } from 'src/app/interface';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss'],
})
export class PersonalProfileComponent implements OnInit, AfterViewInit {
  constructor(
    private userService: UsersService,
    private postService: PostService
  ) {}
  ngAfterViewInit(): void {
    this.loading= true
  }

loading: boolean = false
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
    // this.userService.getUser(id).subscribe({
    //   next: (res) => {
    //     this.loading = false
    //     this.user = res;
    //   },
    // });
    const currentUser :any=  localStorage.getItem('user')
    this.user = JSON.parse(currentUser)
    this.postService.getUserPosts(id).subscribe({
      next: (res) => {
        this.allUserPosts = [...res];
        this.loading = false
      },
      error: (err) => {
        console.error(err.message);
      },
    })
  }


}
